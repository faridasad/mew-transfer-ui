declare module "react" {
  interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
    // extends React's HTMLAttributes
    directory?: string;
    webkitdirectory?: string;
  }
}
import { useRef, useState, useCallback, useMemo } from "react";
import "./card.scss";
import Icon from "../Icons";
import axios from "axios";

interface FileProps {
  name: string;
  size?: number;
  type: string;
}

interface FolderProps {
  name: string;
  type: "folder";
  size?: number;
  files: FileProps[];
}

function Card() {
  const fileRef = useRef<HTMLInputElement>(null);
  const folderRef = useRef<HTMLInputElement>(null);
  const uploader = useRef<HTMLDivElement>(null);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [transferType, setTransferType] = useState("byEmail");
  const [userFiles, setUserFiles] = useState<(FileProps | FolderProps)[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [openId, setOpenId] = useState("");

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files) return;

      if (e.target.webkitdirectory) {
        const folderFiles = Array.from(files).map((file) => ({
          name: file.name,
          size: file.size,
          type: file.type,
          file,
        }));

        const folder: FolderProps = {
          name: files[0].webkitRelativePath.split("/")[0],
          type: "folder",
          size: folderFiles.reduce((acc, file) => acc + file.size, 0),
          files: folderFiles,
        };

        setUserFiles((prev) => [...prev, folder]);

        return;
      }

      const newFiles = Array.from(files).map((file) => ({
        name: file.name,
        size: file.size,
        type: file.type,
        file,
      }));

      setUserFiles((prev) => [...prev, ...newFiles]);
    },
    []
  );

  const deleteFile = useCallback((index: number) => {
    setUserFiles((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const ScrollThroughUploader = useCallback((timeout: number) => {
    setTimeout(() => {
      uploader.current?.scrollTo({
        top: uploader.current.scrollHeight,
        behavior: "smooth",
      });
    }, timeout);
  }, []);

  const handleTransferTypeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTransferType(e.target.value);
      ScrollThroughUploader(100);
    },
    [ScrollThroughUploader]
  );

  const handleLinkSubmit = useCallback(
    async (e: any) => {
      e.preventDefault();

      try {
        const formData = new FormData();

        userFiles.forEach((item: any) => {
          if (item.type === "folder") {
            item.files.forEach((file: any) => {
              formData.append("files", file.file, `${item.name}/${file.name}`);
            });
          } else {
            formData.append("files", item.file);
          }
        });

        const res = await axios.post(
          "https://localhost:7231/Record/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        setOpenId(res.data.id);
      } catch (err) {
        console.log(err);
      }
    },
    [userFiles]
  );


  const memoizedTransferType = useMemo(() => transferType, [transferType]);

  return (
    <div className="uploader">
      <div className="uploader__inner" ref={uploader}>
        {userFiles.length === 0 || !userFiles ? (
          <div
            className={`uploader__files idle${
              memoizedTransferType === "byLink" ? " byLink" : " byEmail"
            }`}
            onClick={() => {
              fileRef.current?.click();
            }}
          >
            <Icon name="addIdle" size={24} />
            <div className="uploader__title">
              <h2>Upload files</h2>
              <button
                className="uploader__sub-title"
                onClick={(e) => {
                  e.stopPropagation();
                  folderRef.current?.click();
                }}
              >
                Or select a folder
              </button>
            </div>
          </div>
        ) : (
          <div
            className={`uploader__files fallow${
              memoizedTransferType === "byLink" ? " byLink" : " byEmail"
            }`}
          >
            <div className="files-container">
              {userFiles.map((file, index) => (
                <div className="file-row" key={index}>
                  <span className="filename">{file.name}</span>
                  <span className="details">
                    {file.size} &bull; {file.type}
                  </span>
                  <span className="delete-btn">
                    <button
                      onClick={() => {
                        deleteFile(index);
                      }}
                    >
                      <Icon name="delete" />
                    </button>
                  </span>
                </div>
              ))}
            </div>

            <div
              className="uploader__footer"
              onClick={(e) => {
                e.stopPropagation();
                setIsDialogOpen((prev) => !prev);
              }}
            >
              <div className={`footer-dialog${isDialogOpen ? " open" : ""}`}>
                <span
                  onClick={() => {
                    fileRef.current?.click();
                  }}
                >
                  <p>Files</p>
                </span>
                <span
                  onClick={() => {
                    folderRef.current?.click();
                  }}
                >
                  <p>Folders</p>
                </span>
              </div>
              <Icon name="addFallow" size={24} />
              <div>
                <h2>Upload files</h2>
                <h3>{userFiles.length} added</h3>
              </div>
            </div>
          </div>
        )}
        <form id="uploader">
          <input
            type="file"
            multiple
            ref={fileRef}
            onChange={(e) => handleFileChange(e)}
          />
          <input
            tabIndex={-1}
            type="file"
            multiple
            webkitdirectory=""
            directory=""
            ref={folderRef}
            onChange={(e) => handleFileChange(e)}
          ></input>
        </form>
        <div className="uploader__fields">
          {memoizedTransferType === "byEmail" ? (
            <>
              <div className="uploader__emailTo uploader__field">
                <input type="text" id="emailTo" />
                <label htmlFor="emailTo">Email to</label>
              </div>
              <div className="uploader__sender uploader__field">
                <input type="text" id="sender" />
                <label htmlFor="sender">Your Email</label>
              </div>
              <div className="uploader__display-name uploader__field">
                <input type="text" id="displayName" />
                <label htmlFor="displayName">Title</label>
              </div>
              <div className="uploader__message uploader__field">
                <textarea id="message"></textarea>
                <label htmlFor="message">Message</label>
              </div>
            </>
          ) : (
            <>
              <div className="uploader__link uploader__field">
                <input type="text" id="getLink-title-text" />
                <label htmlFor="getLink-title-text">Title</label>
              </div>
              <div className="uploader__link uploader__field">
                <textarea id="getLink-message-text" />
                <label htmlFor="getLink-message-text">Message</label>
              </div>
            </>
          )}
        </div>

        <div className={`transfer__options${isOptionsOpen ? " open" : ""}`}>
          <div className="transfer__option transfer__type">
            <div tabIndex={-1} role="radiogroup">
              <div tabIndex={0} role="radio">
                <input
                  type="radio"
                  value="byEmail"
                  checked={memoizedTransferType === "byEmail"}
                  onChange={handleTransferTypeChange}
                  name="transfer__type"
                  id="byEmail"
                />
                <label htmlFor="byEmail">Send email transfer</label>
              </div>
              <div tabIndex={0} role="radio">
                <input
                  type="radio"
                  value="byLink"
                  checked={memoizedTransferType === "byLink"}
                  onChange={handleTransferTypeChange}
                  name="transfer__type"
                  id="getLink"
                />
                <label htmlFor="getLink">Get transfer link</label>
              </div>
            </div>
          </div>
        </div>

        {openId !== "" ? (
          <div className="link-container">
            <div className="link-container__inner">
              <span><a href={`http://localhost:5173/download/${openId}`} target="_blank">{`/${openId}`}</a></span>
            </div>
          </div>
        ) : (
          <div className={`uploader__actions${isOptionsOpen ? " open" : ""}`}>
            <button
              className="uploader__options-button"
              onClick={() => {
                setIsOptionsOpen(!isOptionsOpen);
                ScrollThroughUploader(100);
              }}
            >
              <Icon name="options" size={24} />
            </button>
            {memoizedTransferType === "byEmail" ? (
              <button
                form="uploader"
                className="uploader__transfer-button"
                disabled={userFiles.length === 0}
              >
                Transfer
              </button>
            ) : (             
              <button
                type="button"
                className="uploader__transfer-button"
                disabled={userFiles.length === 0}
                onClick={handleLinkSubmit}
              >
                Get link
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Card;

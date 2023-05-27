import { FunctionComponent } from "react";

type CustomIconProps = {
  size: number;
};

type IconProps = {
  name: string;
  size?: number;
};

const AddIconIdle = ({ size }: CustomIconProps) => {
  return (
    <svg viewBox="0 0 72 72">
      <path
        d="M36.493 72C16.118 72 0 55.883 0 36.493 0 16.118 16.118 0 36.493 0 55.882 0 72 16.118 72 36.493 72 55.882 55.883 72 36.493 72zM34 34h-9c-.553 0-1 .452-1 1.01v1.98A1 1 0 0 0 25 38h9v9c0 .553.452 1 1.01 1h1.98A1 1 0 0 0 38 47v-9h9c.553 0 1-.452 1-1.01v-1.98A1 1 0 0 0 47 34h-9v-9c0-.553-.452-1-1.01-1h-1.98A1 1 0 0 0 34 25v9z"
        fill="#5268ff"
        fillRule="nonzero"
      ></path>
    </svg>
  );
};

const OptionsIcon = ({ size }: CustomIconProps) => {
  return (
    <svg width={size} height={size} fill="#5268ff">
      <path d="M12,24 C5.372583,24 0,18.627417 0,12 C0,5.372583 5.372583,0 12,0 C18.627417,0 24,5.372583 24,12 C24,18.627417 18.627417,24 12,24 Z M12,22 C17.5228475,22 22,17.5228475 22,12 C22,6.4771525 17.5228475,2 12,2 C6.4771525,2 2,6.4771525 2,12 C2,17.5228475 6.4771525,22 12,22 Z M16.5,13.5 C17.3284271,13.5 18,12.8284271 18,12 C18,11.1715729 17.3284271,10.5 16.5,10.5 C15.6715729,10.5 15,11.1715729 15,12 C15,12.8284271 15.6715729,13.5 16.5,13.5 Z M12,13.5 C12.8284271,13.5 13.5,12.8284271 13.5,12 C13.5,11.1715729 12.8284271,10.5 12,10.5 C11.1715729,10.5 10.5,11.1715729 10.5,12 C10.5,12.8284271 11.1715729,13.5 12,13.5 Z M7.5,13.5 C8.32842712,13.5 9,12.8284271 9,12 C9,11.1715729 8.32842712,10.5 7.5,10.5 C6.67157288,10.5 6,11.1715729 6,12 C6,12.8284271 6.67157288,13.5 7.5,13.5 Z"></path>
    </svg>
  );
};

const AddIconFallow = ({ size }: CustomIconProps) => {
  return (
    <svg className="uploader__add-files" viewBox="0 0 24 24">
      <path
        d="M11 11H7.995c-.54 0-.995.448-.995 1 0 .556.446 1 .995 1H11v3.005c0 .54.448.995 1 .995.556 0 1-.446 1-.995V13h3.005c.54 0 .995-.448.995-1 0-.556-.446-1-.995-1H13V7.995c0-.54-.448-.995-1-.995-.556 0-1 .446-1 .995V11zm1 13c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12zm0-2c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
        fill="#5268ff"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

const DeleteIcon = ({ size }: CustomIconProps) => {
  return (
    <svg viewBox="-1 -1 16 16">
      <path
        fill="#3741D9"
        fillRule="evenodd"
        d="M7 5.586L4.738 3.324c-.315-.315-.822-.31-1.136.003l-.186.186c-.315.315-.317.824-.004 1.137l2.262 2.262-2.35 2.35c-.315.315-.31.822.003 1.136l.186.186c.315.315.824.317 1.137.004L7 8.238l2.35 2.35c.315.315.822.31 1.137-.004l.186-.186c.314-.314.316-.823.003-1.136l-2.35-2.35 2.262-2.262c.315-.315.31-.822-.004-1.137l-.186-.186c-.314-.314-.823-.316-1.136-.003L7 5.586z"
      ></path>
    </svg>
  );
};

const icons: Record<string, FunctionComponent<CustomIconProps>> = {
  addIdle: AddIconIdle,
  addFallow: AddIconFallow,
  options: OptionsIcon,
  delete: DeleteIcon,
};

const Icon = ({ name, size = 24 }: IconProps) => {
  const CustomIcon = icons[name];

  return CustomIcon ? <CustomIcon size={size} /> : null;
};

export default Icon;

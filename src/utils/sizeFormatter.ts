export function formatFileSize(fileSize: number): string {
    if (fileSize === 0) {
      return '0 B';
    }
  
    const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const base = 1024;
    const exponent = Math.floor(Math.log(fileSize) / Math.log(base));
    const size = fileSize / Math.pow(base, exponent);
    const formattedSize = size.toFixed(2);
    const unit = units[exponent];
  
    return `${formattedSize} ${unit}`;
  }
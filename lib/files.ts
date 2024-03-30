export function toBase64(file: File) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result as string);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}

export function bufferToBase64(buffer: Buffer, imageType: string) {
  return `data:${imageType};base64,${buffer.toString("base64")}`;
}

export function base64ToBuffer(base64: string) {
  return Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ""), "base64");
}

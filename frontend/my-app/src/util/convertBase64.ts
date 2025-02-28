import { Buffer } from "buffer";
export function convertFileToBase64(
  file: File
): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64String = (reader.result as string).split(",")[1];
      resolve(base64String);
    };
    reader.onerror = reject;
  });
}
export function b64toBlob(dataURI: string) {
  var byteString = atob(dataURI.split(",")[1]);
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);

  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: "image/png" });
}
export const generateImageFromBuffer = (buffer: Buffer) => {
  try {
    if (!buffer) {
      throw new Error("The buffer is undefined or null");
    }
    return buffer.toString("base64");
  } catch (error) {
    console.log(error);
    return "loi";
  }
};

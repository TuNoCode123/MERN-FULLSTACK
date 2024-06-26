export async function base64ToArrayBuffer(base64: any) {
  try {
    // Kiểm tra và loại bỏ phần header (nếu có)
    const base64Data = base64.replace(
      /^data:image\/(png|jpg|jpeg);base64,/,
      ""
    );
    let binaryString = atob(base64Data);
    let bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  } catch (error) {
    console.error("Error decoding base64:", error);
    throw new Error("Invalid base64 string");
  }
}

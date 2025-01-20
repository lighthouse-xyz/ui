import { Area } from "react-easy-crop/types";

async function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", error => reject(error));
    image.setAttribute("crossOrigin", "anonymous");
    image.src = url;
  });
}

async function getCroppedImageUrl(imageUrl: string, croppedArea: Area): Promise<string> {
  const image = await createImage(imageUrl);

  const canvas = document.createElement("canvas");
  canvas.width = croppedArea.width;
  canvas.height = croppedArea.height;

  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      image,
      croppedArea.x,
      croppedArea.y,
      croppedArea.width,
      croppedArea.height,
      0,
      0,
      croppedArea.width,
      croppedArea.height,
    );
  }

  return canvas.toDataURL("image/jpeg");
}

export { getCroppedImageUrl };

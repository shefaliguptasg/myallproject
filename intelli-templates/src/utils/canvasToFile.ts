import html2canvas from "html2canvas";

const canvasToFile = async (
  canvasRef: any,
  fileName: string,
  fileFormate: string
) => {
  const canvas = await html2canvas(canvasRef, {
    useCORS: true,
  });
  if (!canvas) {
    console.error("Canvas element not found.");
    return;
  }
  const croppedCanvas = document.createElement("canvas");
  const croppedCanvasContext = croppedCanvas.getContext("2d");
  const cropPositionTop = 0;
  const cropPositionLeft = 0;
  const cropWidth = canvas.width;
  const cropHeight = canvas.height;

  croppedCanvas.width = cropWidth;
  croppedCanvas.height = cropHeight;
  if (!croppedCanvasContext) {
    return;
  }

  const images: HTMLCollectionOf<HTMLImageElement> =
    document.getElementsByTagName("img");

  const imagePromises = Array.from(images).map((image: HTMLImageElement) => {
    const img = new Image();
    img.src = image.src;
    return new Promise((resolve: (value?: any) => void, reject) => {
      img.onload = () => {
        croppedCanvasContext.drawImage(
          canvas,
          cropPositionLeft,
          cropPositionTop
        );
        resolve();
      };
      img.onerror = () => {
        reject(`Error while loading image ${image?.alt || ""}`);
      };
      img.onabort = console.log;
    });
  });
  await Promise.all(imagePromises);
  // const link = document.createElement("a");
  // link.href = croppedCanvas.toDataURL(`image/${fileFormate}`);
  const blob: Blob | null = await new Promise((resolve) =>
    croppedCanvas.toBlob(resolve, `image/${fileFormate}`)
  );
  // const file = new File([blob], `${fileName}-${Date.now()}.${fileFormate}`, {
  //   type: "image/jpeg",
  // });
  return blob;
};

export default canvasToFile;

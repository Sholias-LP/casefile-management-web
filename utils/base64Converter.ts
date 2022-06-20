export const base64Converter = (file?: File) => {
  return new Promise((resolve) => {
    const myReader = new FileReader();
    myReader.onloadend = (e) => {
      resolve(myReader.result);
    };
    if (file) myReader.readAsDataURL(file);
  });
};

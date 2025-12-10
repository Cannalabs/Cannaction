export const convertToBase64 = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        if (file) {
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result?.toString() ?? '');
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        }
    });
};

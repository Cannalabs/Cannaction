import sharp from 'sharp';

export const createBufferedAvatarImage = async (
	image64: string
): Promise<Buffer> => {
	const uri = image64.split(';base64,').pop();
	const imgBuffer = Buffer.from(uri, 'base64');
	const sharpImage = sharp(imgBuffer);
	const metadataInfo = await sharpImage.metadata();
	if (metadataInfo.width > 600 && metadataInfo.height > 600)
		return sharpImage
			.resize(600, 600, {
				fit: 'fill',
			})
			.webp()
			.toBuffer();

	if (metadataInfo.width > 600)
		return sharpImage.resize({ width: 600, fit: 'fill' }).webp().toBuffer();

	if (metadataInfo.height > 600)
		return sharpImage.resize({ height: 600, fit: 'fill' }).webp().toBuffer();

	return sharpImage.webp().toBuffer();
};

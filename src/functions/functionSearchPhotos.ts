import { API_KEY } from "@env";
import { IImageData } from "../interface";
import { url } from "../services/api";

export const functionSearchPhotos = async (
    setPhotoList: (value: React.SetStateAction<IImageData[]>) => void,
    setLoading: (value: React.SetStateAction<boolean>) => void,
    roverName: string,
    date: Date,
    dayInMilliseconds: number,
    cam: string,
) => {
    const rover = roverName.toLowerCase();
    const dat = new Date(date.getTime() - 1 * dayInMilliseconds)
        .toISOString()
        .slice(0, 10);
    const can = cam && cam.toLowerCase();
    setLoading(true);

    url.get(
        `mars-photos/api/v1/rovers/${rover}/photos?earth_date=${dat}&camera=${can}&api_key=${API_KEY}`,
    )
        .then(async data => {
            setPhotoList(await data.data.photos);
        })
        .catch(error => {
            alert("Erro ao buscar imagens.");
            console.log(error);
        })
        .finally(() => {
            setLoading(false);
        });
};

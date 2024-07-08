import { API_KEY } from "@env";
import { IImageData, IRoverData } from "../interface";
import { url } from "../services/api";

export const functionSearchingData = async (
    setLoading: (value: React.SetStateAction<boolean>) => void,
    roverName: String,
    setRoverData: (value: React.SetStateAction<IRoverData>) => void,
    date: Date,
    dayInMilliseconds: number,
    setCamList: (value: React.SetStateAction<any[]>) => void,
    setPhotoList: (value: React.SetStateAction<IImageData[]>) => void,
    setContextRoverData: (value: React.SetStateAction<IRoverData>) => void,
) => {
    setLoading(true);

    await url
        .get(
            `mars-photos/api/v1/manifests/${roverName.toLowerCase()}?api_key=${API_KEY}`,
        )
        .then(async data => {
            setRoverData(await data.data.photo_manifest);
            setContextRoverData(await data.data.photo_manifest);
        })
        .then(async () => {
            await url
                .get(
                    `mars-photos/api/v1/rovers/${roverName.toLowerCase()}/photos?earth_date=${new Date(
                        date.getTime() - 1 * dayInMilliseconds,
                    )
                        .toISOString()
                        .slice(0, 10)}&api_key=${API_KEY}`,
                )
                .then(async value => {
                    let data = [];
                    data = await value.data.photos;

                    const camList = data
                        .map(item => item.camera.name)
                        .filter(
                            (value, index, array) =>
                                array.indexOf(value) === index,
                        );
                    setCamList(camList);
                    setPhotoList([]);
                })
                .catch(error => {
                    alert("Erro ao buscar dados do Rover.");
                    console.log(error);
                });
        })
        .catch(error => {
            alert("Erro ao buscar datas.");
            console.log(error);
        })
        .finally(() => {
            setLoading(false);
        });
};

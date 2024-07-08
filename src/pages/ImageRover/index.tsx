import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useContext, useEffect, useState } from "react";
import { CustomPicker } from "../../components/CustomPicker";
import { ModalLoading } from "../../components/ModalLoading";
import { PhotoList } from "../../components/PhotoList";
import { AuthContext } from "../../context";
import { functionSearchPhotos } from "../../functions/functionSearchPhotos";
import { functionSearchingData } from "../../functions/functionSearchingData";
import { IImageData, IRoverData } from "../../interface";
import {
    Button,
    Container,
    DateIcon,
    Header,
    IconCam,
    ImageFlatList,
    Results,
    Screen,
    TextButton,
    TextDate,
    TextEmpty,
    ViewData,
    ViewDate,
    ViewPicker,
    Wallpaper,
} from "./styles";

export const ImageRover: React.FunctionComponent = () => {
    const [photoList, setPhotoList] = useState<IImageData[]>([]);
    const [roverData, setRoverData] = useState<IRoverData>({} as IRoverData);
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [camList, setCamList] = useState([]);
    const [cam, setCam] = useState("");
    const [loading, setLoading] = useState(false);
    const { setContextRoverData } = useContext(AuthContext);
    const roverList = ["Curiosity", "Opportunity", "Spirit"];
    const [roverName, setRoverName] = useState("Curiosity");
    /**
     * Contagem dos milissegundos. 21h (-3 do fuso horário) * 60m * 60s * 1000mn
     */
    const dayInMilliseconds = 3 * 60 * 60 * 1000;

    useEffect(() => {
        (async () => {
            await functionSearchingData(
                setLoading,
                roverName,
                setRoverData,
                date,
                dayInMilliseconds,
                setCamList,
                setPhotoList,
                setContextRoverData,
            );
        })();
    }, [date, roverName]);

    const closeDate = (event: Object, date: Date | undefined) => {
        setShow(false);
        if (date) {
            setDate(date);
        }
    };

    const handleSearch = async () => {
        await functionSearchPhotos(
            setPhotoList,
            setLoading,
            roverName,
            date,
            dayInMilliseconds,
            cam,
        );
    };

    return (
        <Container>
            <Wallpaper source={require("../../assets/wallpaperImages.png")}>
                <Screen>
                    <Header>
                        <ViewPicker
                            style={{ alignSelf: "center", marginBottom: 20 }}
                        >
                            <CustomPicker
                                getValue={roverName}
                                setValue={setRoverName}
                                list={roverList}
                            />
                            <IconCam name="options" />
                        </ViewPicker>

                        <ViewData>
                            <ViewDate
                                onPress={() => setShow(true)}
                                activeOpacity={0.8}
                            >
                                <DateIcon name="calendar" />
                                <TextDate>
                                    {date.toLocaleDateString().slice(0, 10)}
                                </TextDate>
                            </ViewDate>

                            {show && roverData.max_date && (
                                <DateTimePicker
                                    value={date}
                                    mode="date"
                                    display="calendar"
                                    maximumDate={
                                        new Date(
                                            new Date(
                                                roverData.max_date,
                                            ).getTime() +
                                                1 * dayInMilliseconds,
                                        )
                                    }
                                    minimumDate={
                                        new Date(roverData.landing_date)
                                    }
                                    onChange={closeDate}
                                />
                            )}

                            <ViewPicker>
                                <CustomPicker
                                    getValue={cam}
                                    setValue={setCam}
                                    list={camList}
                                />
                                <IconCam name="camera" />
                            </ViewPicker>
                        </ViewData>
                        <Button
                            onPress={handleSearch}
                            disabled={!camList.length}
                            activeOpacity={0.8}
                        >
                            <TextButton>Buscar</TextButton>
                        </Button>

                        <Results>
                            {photoList.length > 0 &&
                                `Resultados: ${photoList.length}`}
                        </Results>
                    </Header>

                    {camList.length == 0 ? (
                        <TextEmpty>Sem resultados para esta data.</TextEmpty>
                    ) : (
                        <ImageFlatList
                            data={photoList}
                            renderItem={({ item }) => <PhotoList item={item} />}
                            numColumns={3}
                        />
                    )}

                    {loading && <ModalLoading />}
                </Screen>
            </Wallpaper>
        </Container>
    );
};

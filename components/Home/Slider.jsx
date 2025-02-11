import { View, FlatList, Image, StyleSheet, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import{db} from '../../config/FirebaseConfig';






export default function SliderComponent() {
    const [sliderList, setSliderList] = useState([]);

    useEffect(() => {
        GetSliders();
    }, []);

    const GetSliders = async () => {
        setSliderList([]);
        const GetSliders=async()=>{
            const snapshot=await getDocs(collection(db,'Sliders'));
            snapshot.forEach((doc)=>{
                console.log(doc.data());
            })
        }
    };
    


        return (
            <View>
                <FlatList
                    data={sliderList}
                    horizontal={true}
                    renderItem={({item,index})=>(
                        <View>
                            <Image source={{uri:item?.imageUrl}}
                                style={styles?.sliderImage}
                            />
                        </View>
                    )}
                />
            </View>
        );

}

const styles = StyleSheet.create({
    sliderImage: {
        width: 300,
        height: 200,
        borderRadius: 10,
        resizeMode: 'cover',
    }
});

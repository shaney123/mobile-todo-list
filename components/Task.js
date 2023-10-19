import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';






const Task = (props) => { //passing the item

    const handleDeleteTask = (index) => {
        let itemsCopy = [...taskItems];
        itemsCopy.splice(index, 1);
        setTaskItems(itemsCopy);
      
      }
    

    return (
        <View style={styles.item}>
            <View style={styles.itemLeft}>
                <View style={styles.square}></View>

                <Text style={styles.itemText}>{props.text}</Text>
               
                

            </View> 

            <View style={styles.circular}></View>

           

           
        

        </View>

    )
    

    
}




const styles = StyleSheet.create({
    item: {
        width: 270,
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius:20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        marginRight: 15,
        marginLeft: -10,
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
       
    },
    square: {
        width: 24,
        height: 24,
        backgroundColor: '#55BCF6',
        opacity: 0.4,
        borderRadius: 5,
        marginRight: 15,
    },
    itemText: {
        maxWidth: '80%',
       
    },
    circular: {
        width: 12,
        height: 12, 
        borderColor: '#55BCF6',
        borderWidth: 3,
        borderRadius: 5,
        marginRight: 10,
        flexDirection: 'row',
        
        
    },

   

});

export default Task;
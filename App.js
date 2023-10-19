import React, {useState} from 'react'; 
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Task from './components/Task';
import { useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';









export default function App() {
  const [task, setTask] = useState('');      //we use state for the thngs that change often
  const [taskItems, setTaskItems] = useState([]);   //this is the array to map the task in the screen
  

  useEffect(() => {
    const saveItems = async () => {
      const saveDataInput = await AsyncStorage.getItem('taskItems');
      if (saveDataInput !== null) {
        setTaskItems(JSON.parse(saveDataInput));
      }
    };
    saveItems();

  }, []);

  useEffect(() => {
    AsyncStorage.setItem('taskItems', JSON.stringify(taskItems));

  }, [taskItems]);



  const handleAddTask = () => {
    Keyboard.dismiss();     //the keyboard goes up and down
    setTaskItems([...taskItems, task])
    setTask(null);      //to set the textinput empty
  }

  //const completeTask = (index) => { //to delete
    //let itemsCopy = [...taskItems]; 



  const handleDeleteTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  
  }
  const handleEditedTask = (task) => {
    setTask(task);
  }
  
  

  return (
    <View style={styles.container}>
      {/*Today's Task */}
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Things To Do</Text> 

          <View style={styles.items}>              
            {/*This is where the tasks will go */}
            {
              taskItems.map((item, index) => { //maps the task in the screen
                return (

                  <TouchableOpacity key={index}>

                    <View style={styles.icon}>
                      
                         <Task text={item} />
                         
                        <Feather name="edit-3" size={24} color="black"  onPress={() => handleEditedTask(item)}
                        />
                        
                        <MaterialIcons name="delete-forever" size={24} color="red" onPress={() => handleDeleteTask(index)}/> 

                           
                    </View>

                      

                  </TouchableOpacity>

                   

                )
           
              })

            }

            {/*<Task text={'Task 1'} />
            <Task text={'Task 2'} />
          <Task text={'Task 3'} />

            <TouchableOpacity key={index}  onPress={() => completeTask(index)}> 
                    <Task text={item} />


                  </TouchableOpacity>*/}



          </View>

      </View>

      {/*Write a Task */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
      <TextInput style={styles.input} placeholder={'Write a task'} value={task} onChangeText={text => setTask(text)}/>
      <TouchableOpacity onPress={() => handleAddTask()}>     
        <View style={styles.addWrapper}>

          <Text style={styles.addText}>Add</Text>


        </View>
      </TouchableOpacity>

      </KeyboardAvoidingView>



    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C0C0C0',
  },
  tasksWrapper: {
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    fontStyle: 'italic',
    textAlign: 'center',
  
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 15,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',

  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 275,
  

  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,

  },
  addText: {
    fontSize: 15,
    
  },

  icon: {
    flexDirection: 'row',
   
    
  },
 

});

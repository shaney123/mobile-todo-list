import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Feather  from 'react-native-vector-icons/Feather'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AsyncStorage from '@react-native-async-storage/async-storage';


const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');
  const [editedTask, setEditedTask] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    getTasksFromUserDevice();
  }, []);

  useEffect(() => {
    saveTasksToUserDevice(tasks);
  }, [tasks]);
  
const addTask = () => {
    const newTask = {
      id: Math.random().toString(),
      text: taskText,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setTaskText('');
  
};

  const saveTasksToUserDevice = async (tasks) => {
    try {
      const stringifyTasks = JSON.stringify(tasks);
      await AsyncStorage.setItem('tasks', stringifyTasks);
    } catch (error) {
      console.log(error);
    }
  };

  const getTasksFromUserDevice = async () => {
    try {
      const tasks = await AsyncStorage.getItem('tasks');
      if (tasks != null) {
        setTasks(JSON.parse(tasks));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateTask = () => {
    const updatedTasks = tasks.map((task) =>
      task.id === editingTaskId ? { ...task, text: editedTask } : task
    );
    setTasks(updatedTasks);
    setEditingTaskId(null);
    setIsEditing(false); 
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const toggleTaskCompletion = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

 const renderTask = ({ item }) => (
    <View style={styles.listItem}>
      <TouchableOpacity
        onPress={() => toggleTaskCompletion(item.id)}
        style={[
          styles.checkbox,
          
        ]}
      >
        {item.completed && (
          <Icon name="check" size={24} color={'red'} />
        )}
      </TouchableOpacity>
      {editingTaskId === item.id ? (
        <TextInput
          style={styles.inputText}
          value={editedTask}
          onChangeText={(text) => setEditedTask(text)}
          onBlur={updateTask}
        />
      ) : (
        <Text
          style={[
            styles.taskText,
          ]}
        >
          {item.text}
        </Text>
      )}
      {editingTaskId === item.id ? (
        <TouchableOpacity
          onPress={updateTask}
          style={styles.updateButton}
        >
         <Icon name="update" size={25} color={'red'} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => {
            setEditingTaskId(item.id);
            setEditedTask(item.text); 
            setIsEditing(true);
          }}
          style={styles.editButton}
        >
         <Feather name="edit-3" size={24} color="black"/>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        onPress={() => deleteTask(item.id)}
        style={styles.deleteButton}
      >
         <MaterialIcons name="delete-forever" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Things To Do</Text>
      </View>
      <FlatList
        data={tasks}
        renderItem={renderTask}
        keyExtractor={(item) => item.id.toString()}
      />
      {!isEditing && (
        <View style={styles.footer}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputText}
              placeholder="Add task"
              value={taskText}
              onChangeText={(text) => setTaskText(text)}
            />
          </View>
          <TouchableOpacity onPress={addTask} style={styles.iconContainer}>
            <Icon name="add" size={24} color={'#fff'} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#C0C0C0',
  },
 header: {
  padding: 25,
  justifyContent: 'center',
  backgroundColor: '#C0C0C0',
  margin: 15,
  alignItems: 'center',
},
headerText: {
  fontSize: 45,
  fontWeight: 'bold',
  color: '#000',
},

  footer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#C0C0C0',
    borderColor: '#fff'
    ,
    position: 'absolute',
    bottom: 0,
  },
  inputContainer: {
    height: 50,
    paddingHorizontal: 5,
    backgroundColor: 'white',
    flex: 1,
    marginVertical: 35,
    marginRight: 10,
    borderRadius: 10,
    justifyContent:'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconContainer: {
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listItem: {
    padding: 25,
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderRadius: 15,
    marginVertical: 15,
    alignItems: 'center',
  },
  checkbox: {
    height: 24,
    width: 24,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  taskText: {
    flex: 1,
    fontWeight: 'thin',
    fontSize: 15,
    color: '#000',
  },
  inputText: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderRadius: 5,
    paddingLeft: 5,
    fontSize: 15,
  },
  editButton: {
    paddingHorizontal: 6,
    paddingVertical: 5,
    borderRadius: 5,
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  updateButton: {
    paddingHorizontal: 6,
    paddingVertical: 5,
    borderRadius: 5,
    marginRight: 3,
    marginLeft: 8,
  },
  deleteButton: {
   
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
                                                                                  
import React, {useState, useEffect} from 'react';
import {Alert} from 'react-native';
import {
  SafeAreaView,
  useColorScheme,
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import NavBar from './components/NavBar';
import SingleTodo from './components/SingleTodo';
import {TextInput, Button} from '@react-native-material/core';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AllTodoItemStateType {
  id: number;
  title: string;
  done: boolean;
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const [inputText, setInputText] = useState('');
  const [allTodoItems, setAllTodoItems] = useState<AllTodoItemStateType[]>([
    {
      id: 1,
      title: 'First Todo',
      done: false,
    },
  ]);

  const storeDataInLocalStorage = async (value: AllTodoItemStateType[]) => {
    try {
      let stringObj = JSON.stringify(value);
      await AsyncStorage.setItem('myTodo', stringObj);
    } catch (e) {
      Alert.alert('Error', 'Unable to store data in local storage');
    }
  };

  const getDataFromLocalStorage = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('myTodo');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      Alert.alert('Error', 'Unable to get data from local storage');
      return [];
    }
  };

  const addTodoItem = (title: string) => {
    if (inputText == '') {
      Alert.alert('Todo is empty', 'Type your todo first');
      return;
    }
    let id = allTodoItems?.length + 1;
    let newTodo = {
      id,
      title,
      done: false,
    };
    setAllTodoItems([...allTodoItems, newTodo]);
    storeDataInLocalStorage(allTodoItems);
    setInputText('');
    console.log(allTodoItems);
  };

  const removeTodoItem = (id: number) => {
    let newTodoItems = allTodoItems.filter(todo => {
      todo.id !== id;
    });
    setAllTodoItems(newTodoItems);
    storeDataInLocalStorage(allTodoItems);
  };

  useEffect(() => {
    () => {
      const storedTodoItems = getDataFromLocalStorage().then(res => {
        setAllTodoItems(res);
      });
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <NavBar />
      </View>
      <ScrollView style={styles.todoItems}>
        {allTodoItems.map((todo, i) => (
          <View key={i}>
            <SingleTodo
              id={todo.id}
              title={todo.title}
              done={todo.done}
              removeFunction={removeTodoItem}
            />
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          label="Enter your task"
          variant="standard"
          onChangeText={text => setInputText(text)}
          value={inputText}
        />
        <Button
          variant="outlined"
          title="Add"
          onPress={() => addTodoItem(inputText)}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  todoItems: {},
  inputContainer: {
    width: '100%',
    padding: 10,
  },
});

export default () => <App />;

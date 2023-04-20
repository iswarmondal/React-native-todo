import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {ListItem, Button} from '@react-native-material/core';

interface PropType {
  id: number;
  title: string;
  done: boolean;
  removeFunction: Function;
}

const SingleTodo: React.FC<PropType> = ({id, title, done, removeFunction}) => {
  return (
    <View style={styles.container}>
      <ListItem
        title={title}
        trailing={props => (
          <Button
            title="X"
            variant="outlined"
            color="red"
            onPress={() => {
              console.log(id);
              removeFunction(id);
            }}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default SingleTodo;

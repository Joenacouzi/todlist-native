import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, ToastAndroid, PermissionsAndroid } from 'react-native';
import Input from '../components/input/input'
import Buttonn from '../components/button/button';
import { formatCurrentDateTime } from '../helpers/helper';

const TodoList = () => {
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState([]);
    const [removedTasks, setRemovedTasks] = useState([]);

    const [activeTab, setActiveTab] = useState('Todo');

    const addTask = () => {
        if (task.trim() !== '') {
            setTasks([...tasks, { id: Date.now().toString(), text: task, date: formatCurrentDateTime() }]);
            setTask('');
        }
    };

    const deleteTask = (taskId) => {
        const deletedTasks = tasks.filter((task) => task.id !== taskId);
        ToastAndroid.show('task deleted', ToastAndroid.LONG);
        setRemovedTasks(deletedTasks);
    };

    const removeTask = (taskRow) => {
        const updatedTasks = tasks.filter((task) => task.id !== taskRow.id);
        taskRow.date = formatCurrentDateTime();
        setRemovedTasks([...removedTasks, tasks.find((task) => task.id === taskRow.id)]);
        setTasks(updatedTasks);
    };


    return (
        <View style={styles.container}>
            <View style={{ marginBottom: 20 }}>
                {activeTab === 'Todo' ? <Buttonn label="Removed List" onPress={() => setActiveTab('Removed')} style={{ backgroundColor: 'darkblue' }} />
                    : <Buttonn label="Todo" onPress={() => setActiveTab('Todo')} style={{ backgroundColor: 'darkblue' }} />}
            </View>
            {activeTab === 'Todo' ?
                <View style={{ height: '90%' }}>
                    <Input
                        label="New task"
                        placeholder="Add a new task"
                        value={task}
                        onChangeText={(text) => setTask(text)}
                    />
                    <Buttonn label="Add Task" onPress={addTask} />
                    {tasks.length > 0 ?
                        <FlatList
                            style={{ marginTop: 20, borderWidth: 1, borderColor: 'gray', borderRadius: 7, paddingTop: 15, paddingHorizontal: 10, height: '100%' }}
                            data={tasks}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <View style={styles.task}>
                                    <View style={{ display: 'flex', flexDirection: 'col', gap: 4 }}>
                                        <Text style={{ fontSize: 18 }}>{item.text}</Text>
                                        <Text style={{ fontSize: 14 }}>{item.date}</Text>
                                    </View>
                                    <Buttonn label="X" onPress={() => removeTask(item)} />
                                </View>
                            )}
                        /> : <Text style={{ fontSize: 18, marginTop: 20 }}>You haven't added any task yet</Text>}
                </View>
                :
                removedTasks.length > 0 ?
                    <FlatList
                        style={{ marginTop: 20, borderWidth: 1, borderColor: 'gray', borderRadius: 7, paddingTop: 15, paddingHorizontal: 10, height: '100%' }}
                        data={removedTasks}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.task}>
                                <View style={{ display: 'flex', flexDirection: 'col', gap: 4 }}>
                                    <Text style={{ fontSize: 18 }}>{item.text}</Text>
                                    <Text style={{ fontSize: 14 }}>{item.date}</Text>
                                </View>
                                <Buttonn label="X" onPress={() => deleteTask(item.id)} style={{ backgroundColor: 'red' }} />
                            </View>
                        )}
                    />
                    : <Text style={{ fontSize: 18 }}>You haven't removed any task yet</Text>
            }
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    task: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: 'gray',
        paddingVertical: 5,
        marginBottom: 10,
    },
});

export default TodoList;
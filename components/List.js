import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { List, Divider, Chip } from 'react-native-paper';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const hoursOfDay = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];

export const PlannerList = ({ events }) => {
    return (
        <View style={styles.container}>
            <List.Section>
                <List.Subheader>Planner</List.Subheader>
                <Divider />
                {daysOfWeek.map((day) => (
                    <View key={day}>
                        <List.Subheader>{day}</List.Subheader>
                        <View style={styles.chipsContainer}>
                            {hoursOfDay.map((hour) => (
                                <Chip key={hour} style={styles.chip}>
                                    {hour}
                                </Chip>
                            ))}
                        </View>
                    </View>
                ))}
            </List.Section>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    chipsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: 8,
        marginVertical: 4,
    },
    chip: {
        margin: 4,
    },
});


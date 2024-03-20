import { useState } from 'react';
import { View, FlatList, SafeAreaView, Text, ScrollView } from 'react-native';
import { Stack, Link, useRouter } from 'expo-router';

import { LessonCard } from '../../components';
import { COLORS } from '../../constants';
import TURKISHBONUS1 from './turData/turBonus1'
import TURKISHBONUS2 from './turData/turBonus2'
import TURKISHBONUS3 from './turData/turBonus3'
import TURKISHBONUS4 from './turData/turBonus4'
import TURKISHBONUS5 from './turData/turChapter5'
import TURKISHCHAPTER1 from './turData/turChapter1'
import TURKISHCHAPTER2 from './turData/turChapter2'
import TURKISHCHAPTER3 from './turData/turChapter3'
import TURKISHCHAPTER4 from './turData/turChapter4'
import TURKISHCHAPTER5 from './turData/turChapter5'
import TURKISHCHAPTER6 from './turData/turChapter6'
import TURKISHCHAPTER7 from './turData/turChapter7'
import TURKISHCHAPTER8 from './turData/turChapter8'
import TURKISHCHAPTER9 from './turData/turChapter9'
import TURKISHCHAPTER10 from './turData/turChapter10'
import TURKISHCHAPTER11 from './turData/turChapter11'
import TURKISHCHAPTER12 from './turData/turChapter12'
import TURKISHCHAPTER13 from './turData/turChapter13'
import TURKISHCHAPTER14 from './turData/turChapter14'
import TURKISHCHAPTER15 from './turData/turChapter15'


const turCourse = () => {
    return (
        <SafeAreaView>
        <ScrollView>
            <View style = {{
                flex: 1,
                alignItems: 'center'
            }}>
                <Text>Chapter 1</Text>
                    <FlatList
                        data={ TURKISHCHAPTER1 }
                        showsVerticalScrollIndicator={false}
                        horizontal = {true}
                        renderItem={({ item }) => (
                            <View>
                                <LessonCard
                                    title = {item.title}
                                    color = {COLORS.turkishRed}
                                    onPress = {item.onPress}
                                />
                            </View>
                        )}
                        keyExtractor={(item) => item.id.toString()}
                    />
            </View>
            <View style = {{
                flex: 1,
                alignItems: 'center'
            }}>
                <Text>Chapter 2</Text>
                    <FlatList
                        data={ TURKISHCHAPTER2 }
                        showsVerticalScrollIndicator={false}
                        horizontal = {true}
                        renderItem={({ item }) => (
                            <View>
                                <LessonCard
                                    title = {item.title}
                                    color = {COLORS.turkishRed}
                                    onPress = {item.onPress}
                                />
                            </View>
                        )}
                        keyExtractor={(item) => item.id.toString()}
                    />
            </View>
            <View style = {{
                flex: 1,
                alignItems: 'center'
            }}>
                <Text>Chapter 3</Text>
                    <FlatList
                        data={ TURKISHCHAPTER3 }
                        showsVerticalScrollIndicator={false}
                        horizontal = {true}
                        renderItem={({ item }) => (
                            <View>
                                <LessonCard
                                    title = {item.title}
                                    color = {COLORS.turkishRed}
                                    onPress = {item.onPress}
                                />
                            </View>
                        )}
                        keyExtractor={(item) => item.id.toString()}
                    />
            </View>
            <View style = {{
                flex: 1,
                alignItems: 'center'
            }}>
                <Text>Chapter 4</Text>
                    <FlatList
                        data={ TURKISHCHAPTER4 }
                        showsVerticalScrollIndicator={false}
                        horizontal = {true}
                        renderItem={({ item }) => (
                            <View>
                                <LessonCard
                                    title = {item.title}
                                    color = {COLORS.turkishRed}
                                    onPress = {item.onPress}
                                />
                            </View>
                        )}
                        keyExtractor={(item) => item.id.toString()}
                    />
            </View>
            <View style = {{

                alignItems: 'center'
            }}>
                <Text>Chapter 5</Text>
                    <FlatList
                        data={ TURKISHCHAPTER5 }
                        showsVerticalScrollIndicator={false}
                        horizontal = {true}
                        renderItem={({ item }) => (
                            <View>
                                <LessonCard
                                    title = {item.title}
                                    color = {COLORS.turkishRed}
                                    onPress = {item.onPress}
                                />
                            </View>
                        )}
                        keyExtractor={(item) => item.id.toString()}
                    />
            </View>
            <View style = {{

                alignItems: 'center'
            }}>
                <Text>Bonus Chapter 1</Text>
                    <FlatList
                        data={ TURKISHBONUS1 }
                        showsVerticalScrollIndicator={false}
                        horizontal = {true}
                        renderItem={({ item }) => (
                            <View>
                                <LessonCard
                                    title = {item.title}
                                    color = {COLORS.turkishRed}
                                    onPress = {item.onPress}
                                />
                            </View>
                        )}
                        keyExtractor={(item) => item.id.toString()}
                    />
            </View>
                        <View style = {{

                alignItems: 'center'
            }}>
                <Text>Chapter 6</Text>
                    <FlatList
                        data={ TURKISHCHAPTER6 }
                        showsVerticalScrollIndicator={false}
                        horizontal = {true}
                        renderItem={({ item }) => (
                            <View>
                                <LessonCard
                                    title = {item.title}
                                    color = {COLORS.turkishRed}
                                    onPress = {item.onPress}
                                />
                            </View>
                        )}
                        keyExtractor={(item) => item.id.toString()}
                    />
            </View>
            <View style = {{

                alignItems: 'center'
            }}>
                <Text>Chapter 7</Text>
                    <FlatList
                        data={ TURKISHCHAPTER7 }
                        showsVerticalScrollIndicator={false}
                        horizontal = {true}
                        renderItem={({ item }) => (
                            <View>
                                <LessonCard
                                    title = {item.title}
                                    color = {COLORS.turkishRed}
                                    onPress = {item.onPress}
                                />
                            </View>
                        )}
                        keyExtractor={(item) => item.id.toString()}
                    />
            </View>
            <View style = {{

            alignItems: 'center'
            }}>
                <Text>Bonus Chapter 2</Text>
                    <FlatList
                        data={ TURKISHBONUS2 }
                        showsVerticalScrollIndicator={false}
                        horizontal = {true}
                        renderItem={({ item }) => (
                            <View>
                                <LessonCard
                                    title = {item.title}
                                    color = {COLORS.turkishRed}
                                    onPress = {item.onPress}
                                />
                            </View>
                        )}
                        keyExtractor={(item) => item.id.toString()}
                    />
            </View>
            <View style = {{

            alignItems: 'center'
            }}>
                <Text>Chapter 8</Text>
                    <FlatList
                        data={ TURKISHCHAPTER8 }
                        showsVerticalScrollIndicator={false}
                        horizontal = {true}
                        renderItem={({ item }) => (
                            <View>
                                <LessonCard
                                    title = {item.title}
                                    color = {COLORS.turkishRed}
                                    onPress = {item.onPress}
                                />
                            </View>
                        )}
                        keyExtractor={(item) => item.id.toString()}
                    />
            </View>
            <View style = {{

                alignItems: 'center'
                }}>
                    <Text>Chapter 9</Text>
                        <FlatList
                            data={ TURKISHCHAPTER9 }
                            showsVerticalScrollIndicator={false}
                            horizontal = {true}
                            renderItem={({ item }) => (
                                <View>
                                    <LessonCard
                                        title = {item.title}
                                        color = {COLORS.turkishRed}
                                        onPress = {item.onPress}
                                    />
                                </View>
                            )}
                            keyExtractor={(item) => item.id.toString()}
                        />
            </View>
            <View style = {{

                alignItems: 'center'
                }}>
                    <Text>Bonus Chapter 3</Text>
                        <FlatList
                            data={ TURKISHBONUS3 }
                            showsVerticalScrollIndicator={false}
                            horizontal = {true}
                            renderItem={({ item }) => (
                                <View>
                                    <LessonCard
                                        title = {item.title}
                                        color = {COLORS.turkishRed}
                                        onPress = {item.onPress}
                                    />
                                </View>
                            )}
                            keyExtractor={(item) => item.id.toString()}
                        />
            </View>
            <View style = {{

                alignItems: 'center'
                }}>
                    <Text>Chapter 10</Text>
                        <FlatList
                            data={ TURKISHCHAPTER10 }
                            showsVerticalScrollIndicator={false}
                            horizontal = {true}
                            renderItem={({ item }) => (
                                <View>
                                    <LessonCard
                                        title = {item.title}
                                        color = {COLORS.turkishRed}
                                        onPress = {item.onPress}
                                    />
                                </View>
                            )}
                            keyExtractor={(item) => item.id.toString()}
                        />
            </View>
            
            <View style = {{

                alignItems: 'center'
                }}>
                    <Text>Chapter 11</Text>
                        <FlatList
                            data={ TURKISHCHAPTER11 }
                            showsVerticalScrollIndicator={false}
                            horizontal = {true}
                            renderItem={({ item }) => (
                                <View>
                                    <LessonCard
                                        title = {item.title}
                                        color = {COLORS.turkishRed}
                                        onPress = {item.onPress}
                                    />
                                </View>
                            )}
                            keyExtractor={(item) => item.id.toString()}
                        />
            </View>
            <View style = {{

                alignItems: 'center'
                }}>
                    <Text>Chapter 12</Text>
                        <FlatList
                            data={ TURKISHCHAPTER12 }
                            showsVerticalScrollIndicator={false}
                            horizontal = {true}
                            renderItem={({ item }) => (
                                <View>
                                    <LessonCard
                                        title = {item.title}
                                        color = {COLORS.turkishRed}
                                        onPress = {item.onPress}
                                    />
                                </View>
                            )}
                            keyExtractor={(item) => item.id.toString()}
                        />
            </View>
            <View style = {{

                alignItems: 'center'
                }}>
                    <Text>Bonus Chapter 4</Text>
                        <FlatList
                            data={ TURKISHBONUS4 }
                            showsVerticalScrollIndicator={false}
                            horizontal = {true}
                            renderItem={({ item }) => (
                                <View>
                                    <LessonCard
                                        title = {item.title}
                                        color = {COLORS.turkishRed}
                                        onPress = {item.onPress}
                                    />
                                </View>
                            )}
                            keyExtractor={(item) => item.id.toString()}
                        />
            </View>
            <View style = {{

                alignItems: 'center'
                }}>
                    <Text>Chapter 13</Text>
                        <FlatList
                            data={ TURKISHCHAPTER13 }
                            showsVerticalScrollIndicator={false}
                            horizontal = {true}
                            renderItem={({ item }) => (
                                <View>
                                    <LessonCard
                                        title = {item.title}
                                        color = {COLORS.turkishRed}
                                        onPress = {item.onPress}
                                    />
                                </View>
                            )}
                            keyExtractor={(item) => item.id.toString()}
                        />
            </View>
            <View style = {{

                alignItems: 'center'
                }}>
                    <Text>Chapter 14</Text>
                        <FlatList
                            data={ TURKISHCHAPTER14 }
                            showsVerticalScrollIndicator={false}
                            horizontal = {true}
                            renderItem={({ item }) => (
                                <View>
                                    <LessonCard
                                        title = {item.title}
                                        color = {COLORS.turkishRed}
                                        onPress = {item.onPress}
                                    />
                                </View>
                            )}
                            keyExtractor={(item) => item.id.toString()}
                        />
            </View>
            <View style = {{

                alignItems: 'center'
                }}>
                    <Text>Chapter 15</Text>
                        <FlatList
                            data={ TURKISHCHAPTER15 }
                            showsVerticalScrollIndicator={false}
                            horizontal = {true}
                            renderItem={({ item }) => (
                                <View>
                                    <LessonCard
                                        title = {item.title}
                                        color = {COLORS.turkishRed}
                                        onPress = {item.onPress}
                                    />
                                </View>
                            )}
                            keyExtractor={(item) => item.id.toString()}
                        />
            </View>
</ScrollView>
</SafeAreaView>
        
    )
}

export default turCourse
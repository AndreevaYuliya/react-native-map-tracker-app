import React, { useState } from 'react';

import { View } from 'react-native';
import { Provider as PaperProvider, Button, TextInput } from 'react-native-paper';

import authStore from '../stores/AuthStore';

const AuthScreen = () => {
    const [key, setKey] = useState('');

    const handleAuth = () => {
        if (key) {
            authStore.setKey(key);
        }
    };

    return (
        <PaperProvider>
            <View style={{ padding: 20 }}>
                <TextInput
                    value={key}
                    onChangeText={setKey}
                    placeholder="Enter your unique key"
                    style={{ marginBottom: 20 }}
                />

                <Button mode="contained" onPress={handleAuth}>
                    Login
                </Button>
            </View>
        </PaperProvider>
    );
};

export default AuthScreen;

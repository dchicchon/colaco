let version;

const TRANSACTION_COLLECTION = 'transactions';
const SODA_COLLECTION = 'sodas';
const SODA_DB = 'sodasDB';

const initialSodas = [
    {
        label: 'Fizz',
        description: 'An effervescent fruity experience with hints of grape and coriander.',
        price: 1,
        quantity: 100,
    },
    {
        label: 'Pop',
        description: 'An explosion of flavor that will knock your socks off!',
        price: 1,
        quantity: 100,
    },
    {
        label: 'Cola',
        description:
            'A basic no nonsense cola that is the perfect pick me up for any occasion.',
        price: 1,
        quantity: 200,
    },
    {
        label: 'Mega Pop',
        description:
            'Not for the faint of heart. So flavorful and so invigorating, it should probably be illegal',
        price: 1,
        quantity: 50,
    },
];
export const addSoda = (data) => {
    return new Promise((resolve) => {
        const request = indexedDB.open(SODA_DB, version);

        request.onsuccess = () => {
            const db = request.result;
            const tx = db.transaction(SODA_COLLECTION, 'readwrite');
            const store = tx.objectStore(SODA_COLLECTION);
            store.add(data);
            resolve(data);
        };

        request.onerror = () => {
            const error = request.error?.message;
            if (error) {
                resolve(error);
            } else {
                resolve('Unknown error');
            }
        };
    });
};

export const getSoda = (key) => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(SODA_DB);
        request.onsuccess = () => {
            const db = request.result;
            const tx = db.transaction(SODA_COLLECTION, 'readonly');
            const store = tx.objectStore(SODA_COLLECTION);
            const sodaTx = store.get(key);

            sodaTx.onsuccess = (event) => {
                const soda = {
                    key,
                    ...event.target.result,
                };
                resolve(soda);
            };
            sodaTx.onerror = (event) => {
                resolve(false);
            };
        };
    });
};
export const getTransaction = (key) => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(SODA_DB);
        request.onsuccess = () => {
            const db = request.result;
            const tx = db.transaction(TRANSACTION_COLLECTION, 'readonly');
            const store = tx.objectStore(TRANSACTION_COLLECTION);
            const transactionTx = store.get(key);

            transactionTx.onsuccess = (event) => {
                const transaction = {
                    key,
                    ...event.target.result,
                };
                resolve(transaction);
            };
            transactionTx.onerror = (event) => {
                resolve(false);
            };
        };
    });
};
export const seedDB = () => {
    initialSodas.forEach((soda) => {
        addSoda(soda);
    });
};
export const getSodas = () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(SODA_DB);

        request.onsuccess = () => {
            const db = request.result;
            const tx = db.transaction(SODA_COLLECTION, 'readonly');
            const store = tx.objectStore(SODA_COLLECTION);

            const keysTx = store.getAllKeys();
            keysTx.onsuccess = async (e) => {
                const keys = e.target.result;
                if (keys.length) {
                    const promises = [];
                    keys.forEach(async (key) => {
                        const soda = getSoda(key);
                        promises.push(soda);
                    });

                    // we can do a Promise all fulfilled here?
                    const results = await Promise.all(promises);
                    resolve(results);
                } else {
                    resolve([]);
                }
            };
            keysTx.onerror = (e) => {
                reject(e);
            };
        };
        request.onerror = (e) => {
            console.log('error found')
            console.log(e);
        }
    });
};
export const addTransaction = (data) => {
    return new Promise((resolve) => {
        const request = indexedDB.open(SODA_DB);
        request.onsuccess = async () => {
            const db = request.result;
            const tx = db.transaction(TRANSACTION_COLLECTION, 'readwrite');
            const store = tx.objectStore(TRANSACTION_COLLECTION);
            store.add(data)
            resolve(data);
        };
        request.onerror = () => {
            resolve(false);
        };
    })
}
export const buySoda = (key) => {
    return new Promise((resolve) => {
        const request = indexedDB.open(SODA_DB);
        request.onsuccess = async () => {
            const db = request.result;
            const soda = await getSoda(key);
            const tx = db.transaction(SODA_COLLECTION, 'readwrite');
            const store = tx.objectStore(SODA_COLLECTION);
            soda.quantity = Math.max(0, soda.quantity - 1);
            const res = store.put(soda, key);
            const transaction = {
                label: soda.label,
                price: parseInt(soda.price, 10),
                createdAt: Date.now(),
            }
            await addTransaction(transaction)
            res.onsuccess = (e) => {
                resolve(soda);
            };
            res.onerror = (e) => {
                resolve(false);
            };
        };
        request.onerror = () => {
            resolve(false);
        };
    });
};

export const initDB = () => {
    return new Promise((resolve) => {
        const request = indexedDB.open(SODA_DB);

        request.onupgradeneeded = () => {
            const db = request.result;
            // if the data object store doesn't exist, create it
            if (!db.objectStoreNames.contains(SODA_COLLECTION)) {
                db.createObjectStore(SODA_COLLECTION, { autoIncrement: true });
                seedDB();
            }
            if (!db.objectStoreNames.contains(TRANSACTION_COLLECTION)) {
                db.createObjectStore(TRANSACTION_COLLECTION, { autoIncrement: true });
            }
        };

        request.onsuccess = () => {
            const db = request.result;
            version = db.version;
            resolve(version);
        };

        request.onerror = () => {
            resolve(false);
        };
    });
};
export const getRevenue = () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(SODA_DB);

        request.onsuccess = () => {
            const db = request.result;
            const tx = db.transaction(TRANSACTION_COLLECTION, 'readonly');
            const store = tx.objectStore(TRANSACTION_COLLECTION);

            const transactionsTx = store.getAll();
            transactionsTx.onsuccess = async (event) => {
                const transactions = event.target.result;
                const sum = transactions.reduce((acc, current) => {
                    return current.price + acc
                }, 0)
                resolve(sum);
            };
            transactionsTx.onerror = (event) => {
                reject(event);
            };
        };
        request.onerror = (error) => {
            console.log({ error });
        }
    });
}
export const getTransactions = () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(SODA_DB);

        request.onsuccess = () => {
            const db = request.result;
            const tx = db.transaction(TRANSACTION_COLLECTION, 'readonly');
            const store = tx.objectStore(TRANSACTION_COLLECTION);

            const keysTx = store.getAllKeys();
            keysTx.onsuccess = async (e) => {
                const keys = e.target.result;
                if (keys.length) {
                    const promises = [];
                    keys.forEach(async (key) => {
                        const transaction = getTransaction(key);
                        promises.push(transaction);
                    });

                    // we can do a Promise all fulfilled here?
                    const results = await Promise.all(promises);
                    resolve(results);
                } else {
                    resolve(false);
                }
            };
            keysTx.onerror = (e) => {
                reject(e);
            };
        };
        request.onerror = (error) => {
            console.log({ error });
        }
    });
}
export const deleteSoda = (key) => {
    return new Promise((resolve) => {
        const request = indexedDB.open(SODA_DB);
        request.onsuccess = async () => {
            const db = request.result;
            const tx = db.transaction(SODA_COLLECTION, 'readwrite');
            const store = tx.objectStore(SODA_COLLECTION);
            const res = store.delete(key);
            res.onsuccess = (e) => {
                resolve(1);
            };
            res.onerror = (e) => {
                resolve(false);
            };
        };
        request.onerror = () => {
            resolve(false);
        };
    });
}

export const updateSoda = (soda) => {
    return new Promise((resolve) => {
        resolve();
    })
}

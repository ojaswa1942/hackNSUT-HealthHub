# Random Forest Classification

# Importing the libraries
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd

# Importing the dataset
dataset = pd.read_csv('Symptoms_Diseases.csv')
X = dataset.iloc[:, 0:3].values
y = dataset.iloc[:, 3].values


# Encoding categorical data
# Encoding the Independent Variable
from sklearn.preprocessing import LabelEncoder, OneHotEncoder
labelencoder_X = LabelEncoder()
X[:, 0] = labelencoder_X.fit_transform(X[:, 0])
X[:, 1] = labelencoder_X.fit_transform(X[:, 1])
X[:, 2] = labelencoder_X.fit_transform(X[:, 2])
onehotencoder = OneHotEncoder(categorical_features = [0])
X = onehotencoder.fit_transform(X).toarray()
onehotencoder = OneHotEncoder(categorical_features = [7])
X = onehotencoder.fit_transform(X).toarray()
onehotencoder = OneHotEncoder(categorical_features = [14])
X = onehotencoder.fit_transform(X).toarray()

# avoiding dummy variable trap
X = X[:, 1:]
X = X[:, :-1]


# Feature Scaling
from sklearn.preprocessing import StandardScaler
sc = StandardScaler()
X = sc.fit_transform(X)

# Fitting Random Forest Classification to the Training set
from sklearn.ensemble import RandomForestClassifier
classifier = RandomForestClassifier(n_estimators = 10, criterion = 'entropy', random_state = 0)
classifier.fit(X, y)

X_test = []
for i in range(3):
    sym = input()
    X_test.append(sym)

X_test[0] = labelencoder_X.fit_transform(X_test[0])
X_test[1] = labelencoder_X.fit_transform(X[:, 1])
X_test[2] = labelencoder_X.fit_transform(X[:, 2])
onehotencoder = OneHotEncoder(categorical_features = [0])
X_test = onehotencoder.fit_transform(X_test).toarray()
onehotencoder = OneHotEncoder(categorical_features = [7])
X_test = onehotencoder.fit_transform(X_test).toarray()
onehotencoder = OneHotEncoder(categorical_features = [14])
X_test = onehotencoder.fit_transform(X_test).toarray()

# avoiding dummy variable trap
X_test = X[:, 1:]
X = X[:, :-1]


# Predicting the Test set results
y_pred = classifier.predict(X_test)


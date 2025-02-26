/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

SpaceRace.prototype.addShip = function(data) {
  /*
    TODO: Implement adding a document
  */
  const collection = firebase.firestore().collection('ships');
  return collection.add(data);
};

SpaceRace.prototype.getAllShips = function(render) {
  /*
    TODO: Retrieve a list of ships
  */
  const query = firebase.firestore()
    .collection('ships')
    .limit(50);
  this.getDocumentsInQuery(query, render);
};

SpaceRace.prototype.getDocumentsInQuery = function(query, render) {
  /*
    TODO: Render all documents in the provided query
  */
 query.onSnapshot(snapshot => {
   if (!snapshot.size) return render();
   snapshot.docChanges.forEach(change => {
     if (change.type === 'added') {
       render(change.doc);
     }
     else if (change.type === 'modified') {
      document.getElementById(change.doc.id).remove();
      render(change.doc);
     }
     else if (change.type === 'removed') {
      document.getElementById(change.doc.id).remove();
     }
   })
 });
};

SpaceRace.prototype.deleteShip = function(id) {
  /*
    TODO: Delete a ship
  */
  const collection = firebase.firestore().collection('ships');
  return collection.doc(id).delete()
    .catch(function(error) {
      console.error('Error removing document: ', error);
    });
};

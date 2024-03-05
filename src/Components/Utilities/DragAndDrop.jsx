import React, {useState} from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Basket } from './Basket';

export default function DragAndDrop() {


    return (
        <DndProvider backend={ HTML5Backend }>
           <Basket />

        </DndProvider>
    );
}

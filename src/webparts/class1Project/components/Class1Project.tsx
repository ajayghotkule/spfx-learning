import * as React from 'react';
import { useState, useEffect } from 'react';
import styles from './Class1Project.module.scss';
import type { IClass1ProjectProps } from './IClass1ProjectProps';
import { escape } from '@microsoft/sp-lodash-subset';
import Clasa2UseState from './Class2UseState';
import Class3UseCallback from './Class3UseCallback';
import Class4MountUnmount from './Class4MountUnmount';
import Class5ArrayOps from './Class5ArrayOps';
import Class6UseRef from './Class6UseRef';


// ─── FUNCTION-BASED COMPONENT ────────────────────────────────────────────────
// Instead of "class X extends React.Component", we use a plain function.
// Props are received as a parameter, not via "this.props".
// ─────────────────────────────────────────────────────────────────────────────

const Class1Project: React.FC<IClass1ProjectProps> = (props) => {

  return (
    <div>
      <h2>Class 1 Project</h2>
      <Clasa2UseState />
      <Class3UseCallback />
      <Class4MountUnmount />
      <Class5ArrayOps />
      <Class6UseRef />
    </div>
  );


};

export default Class1Project;

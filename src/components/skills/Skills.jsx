import React from 'react';
import "./skills.css";
import Languages from './Languages';
import ML from './ML';
import Version from './Version';
import Visualization from './Visualization';
import Database from './Database';
import Cloud from './Cloud';

const Skills = () => {
  return (
    <section className="skills section" id="skills">
        <h2 className="section__title">Skills</h2>
        <span className="section__subtitle">Technical Level</span>
        <div className="skills__container container grid">
            <Languages />
            <ML /> 
            <Database /> 
            <Cloud />
            <Visualization /> 
            <Version /> 
        </div>
    </section>
  );
}

export default Skills;
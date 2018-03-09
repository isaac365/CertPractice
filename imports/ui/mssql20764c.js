import React from 'react';

import PrivateHeader from './PrivateHeader';

export default () => {
	return (
		<div>
      <PrivateHeader title="Overview"/>
      
      
			<div className="overview" >
				<div>
				<h1>20764C: Administering a SQL Database Infrastructure</h1>
        </div>
        <a href="/courses/20764C/study" className="button button--study">Study</a>
      </div>

      <div className="page-content__overview">
        <div className="course-description">
          <h2>About this exam</h2>
          <p>Prepare for Microsoft Exam 70-764 - and help demonstrate your real-world mastery of skills for database administration. 
            This exam is intended for database administrators charged with installation, maintenance, and configuration tasks. 
            Their responsibilities also include setting up database systems, making sure those systems operate efficiently, 
            and regularly storing, backing up, and securing data from unauthorized access.
          </p>
          <h3>Focus on the expertise measured by these objectives:</h3>
          <ul className="ul-description">
            <li>Configure data access and auditing</li>
            <li>Manage backup and restore of databases</li>
            <li>Manage and monitor SQL Server instances</li>
            <li>Manage high availability and disaster recovery</li>
          </ul>
        </div>

        <div className="course-specs">
          <table>
            <tr>
              <td className="left">Institution:</td>
              <td className="right">Microsoft</td>
            </tr>
            <tr>
              <td className="left">Price:</td>
              <td className="right">$165.00</td>
            </tr>
            <tr>
              <td className="left">Technology:</td>
              <td className="right">SQL Server</td>
            </tr>
            <tr>
              <td className="left">Audiences:</td>
              <td className="right">IT professionals</td>
            </tr>
            <tr>
              <td className="left">Published:</td>
              <td className="right">October 18, 2016</td>
            </tr>     
            <tr className="last">
              <td className="left">Credit toward:</td>
              <td className="right">MCP, MCSA</td>
            </tr>
          
          </table>
        </div>
      </div>


      

		</div>
	);
};

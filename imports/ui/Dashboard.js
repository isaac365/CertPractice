import React from 'react';

import PrivateHeader from './PrivateHeader';

export default () => {
	return (
		<div>
			<PrivateHeader title="Dashboard"/>
			<div className="page-content__dashboard" >
				<div>
				<h1>Select a course</h1>
				</div>

				<div className="courses">
					<a href="/courses/20764c" className="button--link">20764C: Administering a SQL Database Infrastructure</a>
				</div>



			</div>

		</div>
	);
};

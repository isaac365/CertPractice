import React from 'react';

import PrivateHeader from './PrivateHeader';
import QuestionList from './QuestionList';
import Editor from './Editor';

export default () => {
	return (
		<div>
			<PrivateHeader title="Study"/>
			<div className="page-content" >
				<div className="page-content__sidebar" >
					<QuestionList/>
				</div>
				<div className="page-content__main">
					<Editor/>
				</div>
			</div>
		</div>
	);
};

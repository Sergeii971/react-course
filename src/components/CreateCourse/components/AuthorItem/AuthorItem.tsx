import { AuthorItemProp } from './AuthorItem.types';
import { Button } from 'src/common/Button';

import './AuthorItem.css';

export const AuthorItem: React.FC<AuthorItemProp> = (prop) => {
	if (prop.isCourseAuthor) {
		return (
			<div className='courseAuthorItem' key={prop.author.id}>
				<text>{prop.author.name}</text>

				<div className='removeAuthorButton'>
					<Button
						text='-'
						onClick={prop.onClickRemove}
						id={'removeAuthorButtonId'}
					/>
				</div>
			</div>
		);
	}
	return (
		<div className='courseAuthorItem' key={prop.author.id}>
			<text>{prop.author.name}</text>
			<div className='addAuthorButton'>
				<Button
					text='&#43;'
					onClick={prop.onClickAdd}
					id={'addAuthorButtonId'}
				/>
			</div>
			<div className='removeAuthorButton'>
				<Button
					text='-'
					onClick={prop.onClickRemove}
					id={'removeAuthorButtonId'}
				/>
			</div>
		</div>
	);
};

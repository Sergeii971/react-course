import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { Button } from 'src/common/Button';
import { Input } from 'src/common/Input';
import { Author } from '../Courses/components/CourseCard/Author.types';
import { AuthorItem } from './components/AuthorItem';
import { mockedAuthorsList, mockedCoursesList } from 'src/constants';
import { Course } from 'src/course.type';
import {
	isAuthorNameValid,
	isCourseAuthorListValid,
	isCourseDescriptionValid,
	isCourseDurationValid,
	isCourseTitleValid,
	isNewCourseValid,
} from 'src/util/validator/CourseValidator';
import { getCourseDuration } from 'src/util/CourseUtil';
import { RouterPath } from 'src/util/RouterPath';
import { checkLogIn } from 'src/util/LoginUtil';

import './AddCourse.css';

const titleErrorLabelMessage = 'length should be at least 2 characters';
const descriptionErrorLabelMessage =
	'text length should be at least 2 characters';
const durationErrorLabelMessage = 'duration should be more than 0';
const authorNameErrorLabelMessage = 'length should be at least 2 characters';
const courseAuthorListErrorLabelMessage = 'Add authors to this list';
const AUTHOR_LIST_IS_EMPTY_MESSAGE = 'Author list is Empty';

export const CreateCourse: React.FC = () => {
	checkLogIn();

	const navigate = useNavigate();
	const [title, setTitle] = useState('');
	const [titleErrorLabelValue, setTitleErrorLabelValue] = useState('');
	const [description, setDescription] = useState('');
	const [descriptionErrorLabelValue, setDescriptionErrorLabelValue] =
		useState('');
	const [duration, setDuration] = useState('');
	const [durationErrorLabelValue, setDurationErrorLabelValue] = useState('');
	const [time, setTime] = useState('');
	const [authorName, setAuthorName] = useState('');
	const [authorNameErrorLabelValue, setAuthorNameErrorLabelValue] =
		useState('');
	const [authorList, setAuthorList] = useState(mockedAuthorsList);
	const [courseAuthorList, setCourseAuthorList] = useState([]);
	const [courseAuthorListErrorLabelValue, setCourseAuthorListErrorLabelValue] =
		useState('');

	const titleOnChange = (event) => {
		const newTitle = event.target.value;
		setTitleErrorLabelValue(
			isCourseTitleValid(newTitle) ? '' : titleErrorLabelMessage
		);

		setTitle(newTitle);
	};

	const descriptionOnChange = (event) => {
		const newDescription = event.target.value;
		setDescriptionErrorLabelValue(
			isCourseDescriptionValid(newDescription)
				? ''
				: descriptionErrorLabelMessage
		);
		setDescription(newDescription);
	};

	const durationOnChange = (event) => {
		const newDuration: number = event.target.value;
		if (isCourseDurationValid(newDuration)) {
			setTitleErrorLabelValue('');
			const time: string = getCourseDuration(newDuration);
			setTime(time);
			setDurationErrorLabelValue('');
		} else {
			setDurationErrorLabelValue(durationErrorLabelMessage);
		}
		setDuration(String(newDuration));
	};

	const authorNameOnChange = (event) => {
		const newAuthorName = event.target.value;
		setAuthorNameErrorLabelValue(
			isAuthorNameValid(newAuthorName) ? '' : authorNameErrorLabelMessage
		);
		setAuthorName(newAuthorName);
	};

	const createAuthor = () => {
		if (isAuthorNameValid(authorName)) {
			const newArray = authorList.map((item) => {
				return item;
			});
			const newAuthor: Author = {
				id: uuidv4(),
				name: authorName,
			};
			newArray.push(newAuthor);
			setAuthorList(newArray);
			setAuthorName('');
		} else {
			setAuthorNameErrorLabelValue(authorNameErrorLabelMessage);
		}
	};

	const addCourseAuthor = (authorId: string) => {
		const replacingAuthor: Author = authorList.find((item: Author) => {
			return item.id === authorId;
		});
		const newAuthorArray = authorList.filter((item: Author) => {
			return item.id !== authorId;
		});
		const newCourseAuthorArray = courseAuthorList.map((item) => {
			return item;
		});
		newCourseAuthorArray.push(replacingAuthor);
		setAuthorList(newAuthorArray);
		setCourseAuthorList(newCourseAuthorArray);
		setCourseAuthorListErrorLabelValue(
			isCourseAuthorListValid(newCourseAuthorArray)
				? ''
				: courseAuthorListErrorLabelMessage
		);
	};

	const removeCourseAuthor = (authorId: string) => {
		const replacingAuthor: Author = courseAuthorList.find((item: Author) => {
			return item.id === authorId;
		});
		const newCourseAuthorArray = courseAuthorList.filter((item: Author) => {
			return item.id !== authorId;
		});
		const newAuthorArray = authorList.map((item) => {
			return item;
		});
		newAuthorArray.push(replacingAuthor);
		setAuthorList(newAuthorArray);
		setCourseAuthorList(newCourseAuthorArray);
	};

	const removeAuthor = (authorId: string) => {
		const newAuthorArray = authorList.filter((item: Author) => {
			return item.id !== authorId;
		});
		setAuthorList(newAuthorArray);
	};

	const createCourse = () => {
		const newCourse: Course = {
			id: uuidv4(),
			title: title,
			description: description,
			creationDate: new Date().toUTCString(),
			duration: Number(duration),
			authors: courseAuthorList.map((courseAuthor: Author) => courseAuthor.id),
		};
		if (isNewCourseValid(newCourse)) {
			courseAuthorList
				.filter((courseAuthor) => !authorList.includes(courseAuthor))
				.forEach((author) => {
					authorList.push(author);
				});
			authorList
				.filter((author) => !mockedAuthorsList.includes(author))
				.forEach((newAuthor) => mockedAuthorsList.push(newAuthor));
			mockedCoursesList.push(newCourse);
			navigate(RouterPath.GET_COURSES);
		} else {
			if (!isCourseTitleValid(newCourse.title)) {
				setTitleErrorLabelValue(titleErrorLabelMessage);
			}
			if (!isCourseDescriptionValid(newCourse.description)) {
				setDescriptionErrorLabelValue(descriptionErrorLabelMessage);
			}
			if (!isCourseDurationValid(newCourse.duration)) {
				setDurationErrorLabelValue(durationErrorLabelMessage);
			}
			if (!isCourseAuthorListValid(courseAuthorList)) {
				setCourseAuthorListErrorLabelValue(courseAuthorListErrorLabelMessage);
			}
		}
	};

	return (
		<div>
			<div className='addCourse'>
				<div className='addCourseTitle'>
					<h1>Course Edit/Create Page</h1>
				</div>
				<div className='addCourseForm'>
					<form>
						<div className='addCourseFormTitle'>
							<h3>Main Info</h3>
						</div>
						<div className='courseTitle'>
							<Input
								type={'text'}
								name={'title'}
								id={'titleId'}
								value={title}
								required={true}
								labelText='Title*'
								placeholderText={'Input title'}
								onChange={titleOnChange}
							/>
							<label className='errorLabel'>{titleErrorLabelValue}</label>
						</div>
						<div className='courseDescription'>
							<Input
								type={'textArea'}
								name={'description'}
								id={'descriptionId'}
								value={description}
								required={true}
								labelText={'Description*'}
								placeholderText={'Input description'}
								onChange={descriptionOnChange}
							/>
							<label className='errorLabel'>{descriptionErrorLabelValue}</label>
						</div>
						<div className='durationTitle'>
							<h3>Duration</h3>
						</div>
						<div className='duration'>
							<Input
								type={'number'}
								name={'duration'}
								id={'durationId'}
								value={duration}
								required={true}
								labelText={'Duration*'}
								placeholderText={'Input duration'}
								onChange={durationOnChange}
							/>
							<div className='durationTimeFormat'>
								<text>{time}</text>
							</div>
						</div>
						<label className='errorLabel'>{durationErrorLabelValue}</label>
					</form>
					<div className='authorsModule'>
						<div className='author'>
							<div className='authorTitle'>
								<h3>Authors</h3>
							</div>
							<div className='inputWithButton'>
								<Input
									type={'text'}
									name={'authorName'}
									id={'authorId'}
									value={authorName}
									required={true}
									labelText={'Author Name'}
									placeholderText={'Input author name'}
									onChange={authorNameOnChange}
								/>
								<div className='createCourseButton'>
									<Button
										text='CREATE AUTHOR'
										onClick={createAuthor}
										id={'addAuthorButtonId'}
									/>
								</div>
							</div>
							<label className='errorLabel'>{authorNameErrorLabelValue}</label>
							<div className='authorForm'>
								<div className='courseAuthorTitle'>
									<h3>Authors List</h3>
								</div>
								<div className='authorList'>
									{authorList.length > 0
										? authorList.map((author) => (
												<AuthorItem
													author={author}
													onClickRemove={() => removeAuthor(author.id)}
													onClickAdd={() => addCourseAuthor(author.id)}
													isCourseAuthor={false}
												/>
										  ))
										: AUTHOR_LIST_IS_EMPTY_MESSAGE}
								</div>
							</div>
						</div>
						<div className='courseAuthorForm'>
							<div className='courseAuthorTitle'>
								<h3>Course Authors*</h3>
							</div>
							<div className='courseAuthorList'>
								{courseAuthorList.length > 0
									? courseAuthorList.map((author) => (
											<AuthorItem
												author={author}
												onClickRemove={() => removeCourseAuthor(author.id)}
												onClickAdd={() => addCourseAuthor(author.id)}
												isCourseAuthor={true}
											/>
									  ))
									: AUTHOR_LIST_IS_EMPTY_MESSAGE}
							</div>
							<label className='errorLabel'>
								{courseAuthorListErrorLabelValue}
							</label>
						</div>
					</div>
				</div>
				<div className='mainButtons'>
					<div className='button'>
						<Button
							text='CANCEL'
							onClick={() => navigate(RouterPath.GET_COURSES)}
							id={'cancelButtonId'}
						/>
					</div>
					<div className='button'>
						<Button
							text='CREATE COURSE'
							onClick={() => createCourse()}
							id={'createCourseButtonId'}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

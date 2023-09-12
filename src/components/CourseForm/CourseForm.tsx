import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { Button } from 'src/common/Button';
import { Input } from 'src/common/Input';
import { Author } from '../Courses/components/CourseCard/Author.types';
import { AuthorItem } from './components/AuthorItem';
import { CourseValidator } from 'src/util/validator/CourseValidator';
import { CourseUtil } from 'src/util/CourseUtil';
import { RouterPath } from 'src/util/RouterPath';
import { CommonConstant } from 'src/util/CommonConstant';
import { useAppDispatch, useAppSelector } from 'src/store/hook';
import { selectAllAuthors } from 'src/store/selector/AuthorSelector';
import { NewCourseDto } from 'src/service/dto/NewCourseDto';
import { createNewCourse, updateCourse } from 'src/store/course/thunk';
import { NewAuthorDto } from 'src/service/dto/NewAuthorDto';
import { createNewAuthor, getAllAuthors } from 'src/store/author/thunk';
import { selectAllCourses } from 'src/store/selector/CourseSelector';

import './CourseForm.css';

const TITLE_ERROR_LABEL_MESSAGE = 'length should be at least 2 characters';
const DESCRIPTION_ERROR_LABEL_MESSAGE =
	'text length should be at least 2 characters';
const DURATION_ERROR_LABEL_MESSAGE = 'duration should be more than 0';
const AUTHOR_NAME_ERROR_LABEL_MESSAGE =
	'length should be at least 2 characters';
const COURSE_AUTHOR_LIST_ERROR_LABEL_MESSAGE = 'Add authors to this list';
const AUTHOR_LIST_IS_EMPTY_MESSAGE = 'Author list is Empty';

export const CourseForm: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const isAddCourseCase = location.pathname === RouterPath.ADD_NEW_COURSE;
	const { courseId } = useParams();

	const courseList = selectAllCourses(useAppSelector((state) => state));
	const authors = selectAllAuthors(useAppSelector((state) => state));

	const dispatch = useAppDispatch();

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
	const [authorList, setAuthorList] = useState([]);
	const [courseAuthorList, setCourseAuthorList] = useState([]);
	const [courseAuthorListErrorLabelValue, setCourseAuthorListErrorLabelValue] =
		useState('');

	useEffect(() => {
		dispatch(getAllAuthors());
	}, [dispatch]);

	useEffect(() => {
		if (isAddCourseCase) {
			setAuthorList(authors);
		} else {
			const course = courseList.find((course) => course.id === courseId);
			setTitle(course.title);
			setDescription(course.description);
			setDuration(String(course.duration));
			const courseAuthorList = CourseUtil.getAuthorsByIds(
				course.authors,
				authors
			);
			setCourseAuthorList(courseAuthorList);
			const authorList = authors.filter(
				(author) => !course.authors.includes(author.id)
			);
			setAuthorList(authorList);
		}
	}, [authors, courseId, courseList, isAddCourseCase]);

	const titleOnChange = (event) => {
		const newTitle = event.target.value;
		setTitleErrorLabelValue(
			CourseValidator.isCourseTitleValid(newTitle)
				? ''
				: TITLE_ERROR_LABEL_MESSAGE
		);

		setTitle(newTitle);
	};

	const descriptionOnChange = (event) => {
		const newDescription = event.target.value;
		setDescriptionErrorLabelValue(
			CourseValidator.isCourseDescriptionValid(newDescription)
				? ''
				: DESCRIPTION_ERROR_LABEL_MESSAGE
		);
		setDescription(newDescription);
	};

	const durationOnChange = (event) => {
		const newDuration: number = event.target.value;
		if (CourseValidator.isCourseDurationValid(newDuration)) {
			setTitleErrorLabelValue('');
			const time: string = CourseUtil.getCourseDuration(newDuration);
			setTime(time);
			setDurationErrorLabelValue('');
		} else {
			setDurationErrorLabelValue(DURATION_ERROR_LABEL_MESSAGE);
		}
		setDuration(String(newDuration));
	};

	const authorNameOnChange = (event) => {
		const newAuthorName = event.target.value;
		setAuthorNameErrorLabelValue(
			CourseValidator.isAuthorNameValid(newAuthorName)
				? ''
				: AUTHOR_NAME_ERROR_LABEL_MESSAGE
		);
		setAuthorName(newAuthorName);
	};

	const createAuthor = () => {
		if (CourseValidator.isAuthorNameValid(authorName)) {
			const newAuthor: NewAuthorDto = {
				name: authorName,
			};
			dispatch(createNewAuthor(newAuthor));
			setAuthorName('');
		} else {
			setAuthorNameErrorLabelValue(AUTHOR_NAME_ERROR_LABEL_MESSAGE);
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
			CourseValidator.isCourseAuthorListValid(newCourseAuthorArray)
				? ''
				: COURSE_AUTHOR_LIST_ERROR_LABEL_MESSAGE
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
		const newCourse: NewCourseDto = {
			title: title,
			description: description,
			duration: Number(duration),
			authors: courseAuthorList.map((courseAuthor: Author) => courseAuthor.id),
		};

		if (CourseValidator.isNewCourseValid(newCourse)) {
			dispatch(createNewCourse(newCourse));
			navigate(RouterPath.GET_COURSES);
		} else {
			setCourseFormInputerrorLabels(newCourse);
		}
	};

	const editCourse = () => {
		const newCourse: NewCourseDto = {
			title: title,
			description: description,
			duration: Number(duration),
			authors: courseAuthorList.map((courseAuthor: Author) => courseAuthor.id),
		};

		if (CourseValidator.isNewCourseValid(newCourse)) {
			dispatch(updateCourse(newCourse, courseId));
			navigate(RouterPath.GET_COURSES);
		} else {
			setCourseFormInputerrorLabels(newCourse);
		}
	};

	const setCourseFormInputerrorLabels = (newCourse: NewCourseDto) => {
		if (!CourseValidator.isCourseTitleValid(newCourse.title)) {
			setTitleErrorLabelValue(TITLE_ERROR_LABEL_MESSAGE);
		}

		if (!CourseValidator.isCourseDescriptionValid(newCourse.description)) {
			setDescriptionErrorLabelValue(DESCRIPTION_ERROR_LABEL_MESSAGE);
		}

		if (!CourseValidator.isCourseDurationValid(newCourse.duration)) {
			setDurationErrorLabelValue(DURATION_ERROR_LABEL_MESSAGE);
		}

		if (!CourseValidator.isCourseAuthorListValid(courseAuthorList)) {
			setCourseAuthorListErrorLabelValue(
				COURSE_AUTHOR_LIST_ERROR_LABEL_MESSAGE
			);
		}
	};

	return (
		<div data-testId={'courseFormTestId'}>
			<div className='addCourse'>
				<div className='addCourseTitle'>
					<h1>{CommonConstant.PAGE_TITLE}</h1>
				</div>
				<div className='addCourseForm'>
					<form>
						<div className='addCourseFormTitle'>
							<h3>{CommonConstant.COURSE_FORM_TITLE}</h3>
						</div>
						<div className='courseTitle'>
							<Input
								type={'text'}
								name={CommonConstant.TITLE_NAME_VALUE}
								value={title}
								required={true}
								labelText={CommonConstant.TITLE_LABEL_TEXT}
								placeholderText={CommonConstant.INPUT_TITLE_PLACEHOLDER_TEXT}
								onChange={titleOnChange}
							/>
							<label className='errorLabel'>{titleErrorLabelValue}</label>
						</div>
						<div className='courseDescription'>
							<Input
								type={'textArea'}
								name={CommonConstant.DESCRIPTION_NAME_VALUE}
								value={description}
								required={true}
								labelText={CommonConstant.DESCRIPTION_LABEL_TEXT}
								placeholderText={
									CommonConstant.INPUT_DESCRIPTION_PLACEHOLDER_TEXT
								}
								onChange={descriptionOnChange}
							/>
							<label className='errorLabel'>{descriptionErrorLabelValue}</label>
						</div>
						<div className='durationTitle'>
							<h3>{CommonConstant.DURATION_PART_TITLE}</h3>
						</div>
						<div className='duration'>
							<Input
								type={'number'}
								name={CommonConstant.DURATION_NAME_VALUE}
								value={duration}
								required={true}
								labelText={CommonConstant.DURATION_LABEL_TEXT}
								placeholderText={CommonConstant.INPUT_DURATION_PLACEHOLDER_TEXT}
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
								<h3>{CommonConstant.AUTHORS_PART_TITLE}</h3>
							</div>
							<div className='inputWithButton'>
								<Input
									type={'text'}
									name={CommonConstant.AUTHOR_NAME_VALUE}
									value={authorName}
									required={true}
									labelText={CommonConstant.AUTHORS_LABEL_TEXT}
									placeholderText={
										CommonConstant.INPUT_AUTHORS_PLACEHOLDER_TEXT
									}
									onChange={authorNameOnChange}
								/>
								<div className='createCourseButton'>
									<Button
										text={CommonConstant.CREATE_AUTHOR_BUTTON_TEXT}
										onClick={createAuthor}
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
								<h3>{CommonConstant.COURSE_AUTHOR_LIST_TITLE}</h3>
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
							text={CommonConstant.CANCEL_BUTTON_TEXT}
							onClick={() => navigate(RouterPath.GET_COURSES)}
						/>
					</div>
					<div className='button'>
						<Button
							text={
								isAddCourseCase
									? CommonConstant.ADD_COURSE_BUTTON_TEXT
									: CommonConstant.EDIT_COURSE_BUTTON_TEXT
							}
							onClick={() => (isAddCourseCase ? createCourse() : editCourse())}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

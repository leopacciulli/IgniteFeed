import { useState } from 'react';

import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { Avatar } from './Avatar';
import { Comment } from './Comment';

import styles from './Post.module.css';

export const Post = ({ author, content, publishedAt }) => {
  const [newCommentText, setNewCommentText] = useState('');
  const [comments, setComments] = useState([
    'Post muito bacana'
  ]);

  const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'às' H:mm'h'", {
    locale: ptBR
  });

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true
  });

  const handleCreateNewComment = () => {
    event.preventDefault();

    setComments([...comments, newCommentText]);
    setNewCommentText('');
  }

  const handleNewCommentChange = () => {
    event.target.setCustomValidity('');
    setNewCommentText(event.target.value)
  }

  const handleNewCommentInvalid = () => {
    event.target.setCustomValidity('Esse campo é obrigatório');
  }

  const deleteComment = (commentToDelete) => {
    const commentsWithoutDeletedOne = comments.filter(comment => comment !== commentToDelete)
    setComments(commentsWithoutDeletedOne);
  }

  const isNewCommentEmpty = newCommentText.length === 0;

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar hasBorder src={author.avatarUrl} />
          
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time 
          title={publishedDateFormatted}
          dateTime={publishedAt.toISOString()}
        >
          Publicado {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {content.map(line => {
          if (line.type === 'paragraph') {
            return <p key={line.content}>{line.content}</p>
          } else if (line.type === 'link') {
            return <p key={line.content}><a href=''>{line.content}</a></p>
          }
        })}
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea
          name='comment'
          value={newCommentText}
          onChange={handleNewCommentChange}
          placeholder='Escreva um comentário...'
          onInvalid={handleNewCommentInvalid}
          required
        />

        <footer>
          <button
            type='submit'
            onClick={handleCreateNewComment}
            disabled={isNewCommentEmpty}
          >
            Publicar
          </button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map(comment => (
          <Comment
            key={comment}
            content={comment}
            onDeleteComment={deleteComment}
          />
        ))}
      </div>
    </article>
  )
}
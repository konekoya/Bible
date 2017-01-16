export default function chapterNavigator(opstr, currentBook, currentChapter) {
  const chapterNavs = document.querySelector('.chapter-nav');
  const prevBtn = chapterNavs.querySelector('.prev');
  const nextBtn = chapterNavs.querySelector('.next');
  console.log(prevBtn, nextBtn);

  prevBtn.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(currentChapter, --currentBook);
  });

  nextBtn.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(currentChapter, ++currentBook);
  });
}



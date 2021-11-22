import data from '@data/company.json';
export async function getStaticPaths() {
  const paths = data.map(post => ({
    params: { title: post.title }, // keep in mind if post.id is a number you need to stringify post.id
  }));
  console.log(paths);
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  console.log(params);
  // return {
  //   props: { company: datas },
  // };
}

const About = () => {
  return (
    <div>
      <h1>About Page</h1>
      <p></p>
    </div>
  );
};

export default About;

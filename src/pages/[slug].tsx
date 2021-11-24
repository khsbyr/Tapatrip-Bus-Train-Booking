import data from '@data/company.json';
import Head from 'next/head';
import HeaderBackground from '@components/common/HeaderBackground/';
import NavData from '@data/navData.json';
import Navbar from '@components/common/Navbar';
import Footer from '@components/common/Footer';

export default function About({ info }) {
  return (
    <div>
      {info &&
        data.map(post =>
          post.head === info.slug ? (
            <div key={post.id}>
              <Head>
                <title>{post.title}</title>
              </Head>
              <HeaderBackground isBorderRadius={true} />
              <Navbar navbarData={NavData} />
              <div className="bg-bg py-5 px-7 lg:py-10 sm:px-20">
                <div className="max-w-7xl mx-auto text-cardDate space-y-5">
                  <p className="text-center font-bold text-xl">{post.title}</p>
                  <div
                    className="text-base font-medium space-y-4"
                    dangerouslySetInnerHTML={{
                      __html: post.content,
                    }}
                  />
                </div>
              </div>
              <div className="bg-bg font-Roboto">
                <Footer companyInfo={data} />
              </div>
            </div>
          ) : null
        )}
    </div>
  );
}

export async function getStaticPaths() {
  const paths = data.map(post => ({
    params: { slug: post.head },
  }));
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  return {
    props: { info: params },
  };
}
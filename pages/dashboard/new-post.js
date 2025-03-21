import Editor from "@/components/Editor";
import Leftbar from "../../components/Leftbar";
import Dashnav from "../../components/Dashnav";
import Head from "next/head";
import Link from "next/link";
export default function EditorPage() {
  return (
    <div className="main-nav">

    <Head>
        <link rel="stylesheet" href="/asets/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/asets/css/main.css" />
      </Head>
      <Dashnav/>
      <Leftbar/>

      <section className="content home">

      <div className="block-header">
      <div className="row ptb-50">
            <div className="col-lg-7 col-md-6 col-sm-12">
              <h2>
               Create Blog Post
                <small className="text-muted">Welcome to Viralon</small>
              </h2>
            </div>
            <div className="col-lg-5 col-md-6 col-sm-12">
             
              <ul className="breadcrumb float-md-right">
                <li className="breadcrumb-item ">
                  <Link href="/dashboard/dashboard">
                    <i className="zmdi zmdi-home"></i> Dashboard
                  </Link>
                </li>
                <li className="breadcrumb-item ">
                  <Link href="#" className="active">
                    New Post
                  </Link>
                </li>
              </ul>
            </div>
          </div>
      {/* <h1 className="blogs-heading text-center my-4">Create a Blog Post</h1> */}

      <Editor />
      </div>
      </section>
    </div>
  );
}

import React from 'react'
import Head from 'next/head'
import { Row, Col, Breadcrumb, Affix } from 'antd'
import Header from '../components/Header'
import Author from '../components/Author'
import Footer from '../components/Footer'
import BreadcrumbItem from 'antd/lib/breadcrumb/BreadcrumbItem'
import { HomeOutlined, FileTextOutlined, SmileOutlined } from '@ant-design/icons'
import '../styles/pages/detail.css'
import ReactMarkdown from 'react-markdown'
import MarkNav from 'markdown-navbar';
import 'markdown-navbar/dist/navbar.css';
import axios from 'axios'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'


const Detailed = (props) => {
  console.log(props)
  const renderer = new marked.Renderer();

  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    }
  });

  let title = marked(props.title)
  let html = marked(props.article_content)

  return (
    <>
      <Head>
        <title>Detailed</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
          <div>
            <div className='bread-div'>
              <Breadcrumb>
                <BreadcrumbItem><a href="/">首页</a></BreadcrumbItem>
                <BreadcrumbItem><a href="/list">文章</a></BreadcrumbItem>
                <BreadcrumbItem>xxx</BreadcrumbItem>
              </Breadcrumb>
            </div>
            <div>
              <div className="detailed-title"
                dangerouslySetInnerHTML={{ __html: title }}>
              </div>

              <div className="list-icon center">
                <span><HomeOutlined /> 2019-06-28</span>
                <span><HomeOutlined /> 文章</span>
                <span><HomeOutlined /> 5498人</span>
              </div>

              <div className="detailed-content"
                dangerouslySetInnerHTML={{ __html: html }}>
              </div>

            </div>

          </div>
        </Col>

        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Affix offsetTop={5}>
            <div className="detailed-nav comm-box">
              <div className="nav-title">文章目录</div>
              <MarkNav
                className="article-menu"
                source={html}
                ordered={false}
              />
            </div>
          </Affix>
        </Col>
      </Row>
      <Footer />
    </>
  )
}

Detailed.getInitialProps = async (context) => {

  console.log(context)
  let id = context.query.id
  const promise = new Promise((resolve) => {

    axios('http://127.0.0.1:7001/default/getArticleById/' + id).then(
      (res) => {
        resolve(res.data.data[0])
      }
    )
  })

  return await promise
}

export default Detailed
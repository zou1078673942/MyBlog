import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Row, Col, List } from 'antd'
import Header from '../components/Header'
import '../styles/pages/comm.css'
import { HomeOutlined, FileTextOutlined, SmileOutlined } from '@ant-design/icons'
import '../styles/pages/index.css'
import Author from '../components/Author'
import Footer from '../components/Footer'
import axios from 'axios'

const Home = (list) => {
  // console.log(list)
  const [myList, setMyList] = useState(list.data)

  return (
    <>
      <Head>
        <title>17_Blog</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
          <List
            header={<div>最新日志</div>}
            itemLayout="vertical"
            dataSource={myList}
            renderItem={item => (
              <List.Item>
                <div className="list-title">
                  <Link href={{ pathname: '/detailed', query: { id: item.id } }}>
                    <a>{item.title}</a>
                  </Link>
                </div>                
                <div className="list-icon">
                  <span><HomeOutlined /> {item.addTime}</span>
                  <span><FileTextOutlined /> {item.typeName}</span>
                  <span><SmileOutlined /> {item.view_count}</span>
                </div>
                <div className="list-context">{item.introduce}</div>
              </List.Item>
            )}
          />
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
        </Col>
      </Row>
      <Footer />
    </>
  )
}

Home.getInitialProps = async () => {
  const promise = new Promise((resolve) => {
    axios('http://127.0.0.1:7001/default/getArticleList').then(
      (res) => {
        // console.log('远程获取数据结果:', res.data.data)
        resolve(res.data)
      }
    )
  })

  return await promise
}

export default Home
import React, {useState} from 'react';
import logo from './logo.svg';
import { NavigationBar } from '../../components/NavigationBar';
import { Card, Columns, Container, Content, Footer, Heading, Hero, Media, Form, Table,Button } from 'react-bulma-components';
import Chat from '../../components/chat';
import { Ticket } from '../../components/Ticket';
import Manage from '../manage';
import { useLocation, useNavigate, useParams,} from "react-router-dom";

function App() {
  interface TestInterface {
    _id: string,
    input: string,
    title: string,
    score: number,
    solution?: string
  }

  let navigate = useNavigate();
  const endPoint = process.env.REACT_APP_API_URL || 'http://localhost:8000';
  const [loadingTest, setLoadingTest] = useState(false);
  const [testResults, setTestResults] = useState<Array<TestInterface>>([]);
  const [document, setDocument] = useState("");

  const handleTestEmbeddings = () => {
      setLoadingTest(true);
      fetch(`${endPoint}/testEmbedding`, {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          keyword: document,
        })
      }).then((res)=> {
        return res.json()
      }).then((res)=> {
        setTestResults(res.related);
        console.log(res.related);
      }).finally(()=> {
        setLoadingTest(false);
      })
    }

  
  

  return (
    <div>
      <Hero
        hasNavbar={true}
        size="fullheight"
        
        // color="primary"
        style={{
          paddingTop: 100,
          backgroundColor:'#A7C6ED',
        }}  
      >
        <Hero.Body
        >
          <Container>
            
          <Form.Field kind="addons">
            <Form.Control fullwidth>
              <Form.Input
                    onChange={(e)=>setDocument(e.target.value)}
                    onKeyDown={(e)=>{
                      if (e.key === `Enter`)
                        handleTestEmbeddings()
                      }}
                      
                    value={document}
                    placeholder="Search"
                    
                    
                      
                      style={{
                      borderRadius: 20,
                      maxHeight: "50px",
                      minHeight: "50px",
                      overflow: "hidden",
                      resize:"none"

                    }}
                    />
            </Form.Control>
            <Form.Control>
              <Button
              onClick={()=>setDocument('')}

              style={{
                borderRadius: "20px",
                maxHeight: "50px",
                minHeight: "50px",
                overflow: "hidden",
                resize:"none"

              }}
              >Clear</Button>
            </Form.Control>
          </Form.Field>

          <Form.Field
          style={{
            paddingInline: 100,
          }}
          >
          </Form.Field>

<section>
            <Columns
            style={{
              paddingTop: 20
            }}>
              {testResults.map((res)=>{        
                    return (
                      <Columns.Column className='is-one-third'
                      style={{
                        display: 'flex' ,
                        flexDirection: 'column',
                        alignItems: 'center'
                      }}>
                      <Card style={{  maxWidth: '70%', minWidth: '100%', margin: 10, minHeight: '100%'}}
                        onClick={()=> {
                          navigate('view-solution/'+res._id)
                        }}>
                            <Card.Content>
                              <Media>
                                <Media.Item>
                                  <Heading
                                  
                                  size={4}
                                  style={{
                                    color:"black",
                                    }}
                                    >
                                      {res.title}
                                    </Heading>
                                
                                </Media.Item>
                              </Media>
                              <Content>
                                {res.input}
                              </Content>
                            </Card.Content>
                        </Card>

                        
                      </Columns.Column> 
                    )
              })}   
              
              <Columns.Column className='is-one-third'
                      style={{
                        display: 'flex' ,
                        flexDirection: 'column',
                        alignItems: 'center'
                      }}>
                <Card 
                  style={{ width: '100%', margin: 10, minHeight: '100%', backgroundColor: '#e9eda7', cursor: 'pointer'  }}>
                  <Card.Content>
                    <Media>
                      <Media.Item>
                        <Heading size={4}
                        style={{
                          color:"black",
                          }}
                          >
                            Submit Ticket
                          </Heading>
                      
                      </Media.Item>
                    </Media>
                    <Content>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec
                      iaculis mauris. <a>@bulmaio</a>.<a href="#1">#css</a>{' '}
                      <a href="#2">#responsive</a>
                    </Content>
                  </Card.Content>
              </Card>    
            </Columns.Column>
            </Columns>
            </section>
              <Columns
              style={{
                display: 'flex' ,
                flexDirection: 'column',
                alignItems: 'center'
              }}>
              
              </Columns>
              

          </Container>
        </Hero.Body>
        <Hero.Footer p={5}>
          <Content style={{ textAlign: 'center' }}>
              <strong>Created</strong> by{' '}
              <a>LaSson and ToLay</a>.
          </Content>
        </Hero.Footer>
      </Hero>
      <Chat 
        width={400}
      />
    </div>

    
  );
}

export default App;

import { Button, Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import { BASE_URL } from "../config.js";
import axios from "axios";

function Courses(){
    const [courses, setCourses] = useState([]);
    
    const init = async() => {
            const response = await axios.get(`${BASE_URL}/admin/courses`, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })
            setCourses(response.data.courses)
    }

    useEffect(() => {
        init();
    }, []);

    return (
        <div style={{
            minHeight: "100vh",
            width: "100vw",
            backgroundColor: "#eeeeee"
          }}>
        <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center" }}>  
            {courses.map(course => {
                return <Course course={course} key={course._id}/>
            })}
        </div>
        </div>
    )
}

export function Course({course}){
    const navigate = useNavigate()
    return <Card style={{
        margin: 10,
        width: 300,
        minHeight: 200,
        padding: 20,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    }}>
        <img src= {course.imageLink} style={{width: 300}}/>
        <div>
        <Typography textAlign={"center"} variant="h5">{course.title}</Typography>
        <Typography textAlign={"center"} variant="subtitle1" style={{color: "gray"}}>{course.description}</Typography>
        <div style={{display: "flex", justifyContent: "center", marginTop: 20}}>
            <Button variant="contained" size="large" onClick={() => {
                navigate("/course/" + course._id);
            }}>Edit</Button>
        </div>
        </div>
    </Card>
}

export default Courses;
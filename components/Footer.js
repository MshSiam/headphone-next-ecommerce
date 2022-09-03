import React from "react"
import {
  AiFillInstagram,
  AiOutlineTwitter,
  AiOutlineGithub,
  AiOutlineLinkedin
} from "react-icons/ai"

const Footer = () => {
  return (
    <div className="footer-container">
      <p>&copy; Reserved by Muhammad Siam</p>
      <p className="icons">
        <AiFillInstagram />
        <AiOutlineTwitter />
        <AiOutlineGithub />
        <AiOutlineLinkedin />
      </p>
    </div>
  )
}
export default Footer

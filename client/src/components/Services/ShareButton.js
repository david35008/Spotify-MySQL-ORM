// import React from 'react';
// import {motion} from 'framer-motion'
// import { makeStyles } from '@material-ui/core/styles';
// import Popover from '@material-ui/core/Popover';
// import Typography from '@material-ui/core/Typography';
// import ShareIcon from '@material-ui/icons/Share';
// import { WhatsappShareButton,FacebookMessengerIcon, EmailShareButton,FacebookMessengerShareButton,
//     WhatsappIcon,EmailIcon, FacebookShareButton,
//       FacebookIcon,
    
//   } from "react-share"
// import "./Share"
// const useStyles = makeStyles((theme) => ({
//   typography: {
//     padding: theme.spacing(2),
//   },
// }));

// export default function Share({link, songName, artistName}) {
//   const classes = useStyles();
//   const [anchorEl, setAnchorEl] = React.useState(null);

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const open = Boolean(anchorEl);
//   const id = open ? 'simple-popover' : undefined;

//   return (
//     <div className="share" >
//     <motion.div 
//     animate={{rotate:720}}
//     transition={{
//         default: { duration: 0.6 },
//         delay:0.6
//     }}
//     >
//       <span style={{cursor:"pointer"}} aria-describedby={id}  onClick={handleClick}>
//       <ShareIcon style={{fontSize:16}} />
//       </span>
//       <Popover
//         id={id}
//         open={open}
//         anchorEl={anchorEl}
//         onClose={handleClose}
//         anchorOrigin={{
//           vertical: 'bottom',
//           horizontal: 'center',
//         }}
//         transformOrigin={{
//           vertical: 'top',
//           horizontal: 'center',
//         }}
//       >
//         <Typography className={classes.typography}>
//         <WhatsappShareButton 
//                 url={link}
//                 title={`Check out ${songName} by ${artistName}:`}
//                 className={classes.socialMediaButton}>
//                  <WhatsappIcon size={36} />
//               </WhatsappShareButton>
//               <FacebookMessengerShareButton style={{outline:0}} 
//                 url={link}
//                 title={`Check out ${songName} by ${artistName}:`}
//                 className={classes.socialMediaButton}>
//                  <FacebookMessengerIcon size={36} />
//               </FacebookMessengerShareButton>
//               <EmailShareButton style={{outline:0}} 
//                 url={link}
//                 title={`Check out ${songName} by ${artistName}:`}
//                 className={classes.socialMediaButton}>
//                  <EmailIcon size={36} />
//               </EmailShareButton>
//               <FacebookShareButton style={{outline:0}} 
//                 url={link}
//                 quote={`Check out ${songName} by ${artistName}:`}
//                 className={classes.socialMediaButton}>
//                  <FacebookIcon size={36} />
//               </FacebookShareButton>
//             </Typography>
//       </Popover>
//     </motion.div>
//     </div>
//   );
// }
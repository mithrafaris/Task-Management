import React from "react";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import {
	CollectionsBookmark,
	Edit,
	Feedback,
	Help,
	PermMedia,
	UploadFile,
	Work,
} from "@mui/icons-material";

function Task() {
	const itemsList = (
		<Box
			sx={{
				width: 250,
				backgroundColor: "#09212E",
				height: "100%",
			}}
			role="drawer"
		>
			<Typography
				sx={{ textAlign: "center", pt: 4, color: "green", fontSize: 20 }}
			>
				GeeksforGeeks
			</Typography>
			<List>
				<ListItemButton sx={{ color: "white" }}>
					<ListItemIcon sx={{ color: "white" }}>
						<Help />
					</ListItemIcon>
					<ListItemText primary={"How to write"} />
				</ListItemButton>
				<ListItemButton sx={{ color: "white" }}>
					<ListItemIcon sx={{ color: "white" }}>
						<CollectionsBookmark />
					</ListItemIcon>
					<ListItemText primary={"Posts"} />
				</ListItemButton>
				<ListItemButton sx={{ color: "white" }}>
					<ListItemIcon sx={{ color: "white" }}>
						<UploadFile />
					</ListItemIcon>
					<ListItemText primary={"Pick Article"} />
				</ListItemButton>
				<ListItemButton sx={{ color: "white" }}>
					<ListItemIcon sx={{ color: "white" }}>
						<Edit />
					</ListItemIcon>
					<ListItemText primary={"Improve"} />
				</ListItemButton>
			</List>
			<Divider />
			<List>
				<ListItemButton sx={{ color: "white" }}>
					<ListItemIcon sx={{ color: "white" }}>
						<Edit />
					</ListItemIcon>
					<ListItemText primary={"Suggest"} />
				</ListItemButton>
				<ListItemButton sx={{ color: "white" }}>
					<ListItemIcon sx={{ color: "white" }}>
						<Work />
					</ListItemIcon>
					<ListItemText primary={"Work with us"} />
				</ListItemButton>
				<ListItemButton sx={{ color: "white" }}>
					<ListItemIcon sx={{ color: "white" }}>
						<PermMedia />
					</ListItemIcon>
					<ListItemText primary={"Media"} />
				</ListItemButton>
				<ListItemButton sx={{ color: "white" }}>
					<ListItemIcon sx={{ color: "white" }}>
						<Feedback />
					</ListItemIcon>
					<ListItemText primary={"Contact us"} />
				</ListItemButton>
			</List>
			<Typography
				sx={{
					backgroundColor: "blue",
					color: "white",
					borderRadius: 10,
					textAlign: "center",
					padding: 1,
					margin: 2,
				}}
			>
				Sign In
			</Typography>
		</Box>
	);

	return (
		<div>
			<div style={{ textAlign: "center", color: "green", marginLeft: 250 }}>
				
			</div>
			<Drawer
				variant="permanent"
				anchor="left"
				sx={{
					width: 250,
					flexShrink: 0,
					"& .MuiDrawer-paper": {
						width: 250,
						boxSizing: "border-box",
					},
				}}
			>
				{itemsList}
			</Drawer>
		</div>
	);
}

export default Task;

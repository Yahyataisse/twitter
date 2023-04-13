"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Avatar, Menu, MenuItem } from "@mui/material";
import {
    FaHome,
    FaBell,
    FaEnvelope,
    FaUser,
    FaCog,
    FaHashtag,
    FaLock,
    FaEllipsisH,
} from "react-icons/fa";

import useAuth from "@/hooks/useAuth";
import NewTweetDialog from "../dialog/NewTweetDialog";

export default function LeftSidebar() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [isNewTweetOpen, setIsNewTweetOpen] = useState(false);

    const auth = useAuth();
    const pathname = usePathname();

    const tempIsLocked = true;

    const handleAnchorClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleAnchorClose = () => {
        setAnchorEl(null);
    };

    const handleNewTweetClick = () => {
        setIsNewTweetOpen(true);
    };
    const handleNewTweetClose = () => {
        setIsNewTweetOpen(false);
    };

    return (
        <>
            <aside className="left-sidebar">
                <div className="fixed">
                    <Image src="/assets/favicon.png" alt="" width={40} height={40} />
                    <nav>
                        <ul>
                            <li>
                                <Link href="/home">
                                    <div
                                        className={`nav-link ${
                                            pathname.startsWith("/home") ? "active" : ""
                                        }`}
                                    >
                                        <FaHome /> Home
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <Link href="/explore">
                                    <div
                                        className={`nav-link ${
                                            pathname.startsWith("/explore") ? "active" : ""
                                        }`}
                                    >
                                        <FaHashtag /> Explore
                                    </div>
                                </Link>
                            </li>
                            {auth.token && (
                                <>
                                    <li>
                                        <Link href="/notifications">
                                            <div
                                                className={`nav-link ${
                                                    pathname.startsWith("/notifications")
                                                        ? "active"
                                                        : ""
                                                }`}
                                            >
                                                <FaBell /> Notifications
                                            </div>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/messages">
                                            <div
                                                className={`nav-link ${
                                                    pathname.startsWith("/messages") ? "active" : ""
                                                }`}
                                            >
                                                <FaEnvelope /> Messages
                                            </div>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/profile">
                                            <div
                                                className={`nav-link ${
                                                    pathname.startsWith("/profile") ? "active" : ""
                                                }`}
                                            >
                                                <FaUser /> Profile
                                            </div>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/settings">
                                            <div
                                                className={`nav-link ${
                                                    pathname.startsWith("/settings") ? "active" : ""
                                                }`}
                                            >
                                                <FaCog /> Settings
                                            </div>
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </nav>
                    {auth.token && (
                        <>
                            <button onClick={handleNewTweetClick} className="btn btn-tweet">
                                Tweet
                            </button>
                            <button onClick={handleAnchorClick} className="side-profile">
                                <div>
                                    <Avatar alt="" src="https://picsum.photos/200/300" />
                                </div>
                                <div>
                                    <p className="token-name">
                                        {auth.token.name} {tempIsLocked ? <FaLock /> : null}
                                    </p>
                                    <p className="text-muted token-username">
                                        @{auth.token.username}
                                    </p>
                                </div>
                                <div className="three-dots">
                                    <FaEllipsisH />
                                </div>
                            </button>
                            <Menu
                                anchorEl={anchorEl}
                                onClose={handleAnchorClose}
                                open={Boolean(anchorEl)}
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "right",
                                }}
                                transformOrigin={{
                                    vertical: "bottom",
                                    horizontal: "right",
                                }}
                            >
                                <MenuItem onClick={handleAnchorClose}>
                                    <Link href="/profile">Profile</Link>
                                </MenuItem>
                                <MenuItem onClick={handleAnchorClose}>
                                    <Link href="/settings">Settings</Link>
                                </MenuItem>
                                <MenuItem onClick={auth.logout}>Log Out</MenuItem>
                            </Menu>
                        </>
                    )}
                </div>
            </aside>
            {auth.token && (
                <NewTweetDialog
                    open={isNewTweetOpen}
                    handleNewTweetClose={handleNewTweetClose}
                    token={auth.token}
                />
            )}
        </>
    );
}

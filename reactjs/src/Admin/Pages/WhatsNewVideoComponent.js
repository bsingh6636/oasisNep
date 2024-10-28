import React, { useState } from 'react';
import { BackendPort } from '../../Const/url';

const WhatsNewVideoComponent = () => {
    const [name, setName] = useState('');
    const [platform, setPlatform] = useState('');
    const [trailerLink, setTrailerLink] = useState('');
    const [videos, setVideos] = useState([]);
    const [error, setError] = useState('');

    const handleAddOrUpdate = async () => {
        try {
            const response = await fetch(`${BackendPort}/admin/addWhatsNewVideo`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ Name: name, Platform: platform, TrailerLink: trailerLink }),
            });
            const data = await response.json();
            if (data.success) {
                setName('');
                setPlatform('');
                setTrailerLink('');

            } else {
                setError(data.message || 'Failed to add/update video');
            }
        } catch (err) {
            setError('An error occurred while adding/updating the video');
        }
    };

    const handleDelete = async (videoId) => {
        try {
            const response = await fetch(`${BackendPort}/admin/deleteWhatsNewVideo`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ _id: videoId }),
            });
            const data = await response.json();
            if (data.success) {

            } else {
                setError(data.message || 'Failed to delete video');
            }
        } catch (err) {
            setError('An error occurred while deleting the video');
        }
    };

    const fetchAllVideos = async () => {
        try {
            const response = await fetch(`${BackendPort}/admin/viewWhatsNewVideo`);
            const data = await response.json();
            if (data.success) {
                setVideos(data.items);
            } else {
                setError(data.message || 'Failed to fetch videos');
            }
        } catch (err) {
            setError('An error occurred while fetching videos');
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4 bg-gray-100 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">WhatsNewVideo Management</h1>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border p-2 rounded mr-2 w-full"
                />

                <select
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                    className="border p-2 rounded mr-2 w-full">
                    {['Netflix', 'Prime Video'].map((platform) => (<option key={platform} value={platform}>{platform}</option>))}
                </select>
                <input
                    type="text"
                    placeholder="Trailer Link"
                    value={trailerLink}
                    onChange={(e) => setTrailerLink(e.target.value)}
                    className="border p-2 rounded mr-2 w-full"
                />
                <button
                    onClick={handleAddOrUpdate}
                    className="bg-blue-500 text-white p-2 rounded"
                >
                    Add/Update Video
                </button>
            </div>

            <div className="mb-4">
                <button
                    onClick={fetchAllVideos}
                    className="bg-gray-500 text-white p-2 rounded"
                >
                    View All Videos
                </button>
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-2">All Videos</h2>
                <ul className="list-disc pl-5">

                    {videos.map((video) => (
                        <li key={video._id} className="mb-2 flex items-center">
                            <div className="flex-1">
                                <strong>{video.Name}</strong> - {video.Platform} - <a href={video.TrailerLink} className="text-blue-500" target="_blank" rel="noopener noreferrer">Trailer</a>
                            </div>
                            <button
                                onClick={() => handleDelete(video._id)}
                                className="bg-red-500 text-white p-2 rounded ml-4"
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default WhatsNewVideoComponent;

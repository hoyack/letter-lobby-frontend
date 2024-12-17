import React, { useState } from 'react';

const Profile = () => {
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: 'jane.doe@example.com', // Read-only email
    profilePhoto: null,
    thumbnailPhoto: null,
    dateOfBirth: '',
    gender: '',
    race: '',
    personalDescription: '',
    homePhone: '',
    cellPhone: '',
    preferredContactMethod: '',
    websiteUrl: '',
    socialMediaHandles: { twitter: '', linkedin: '' },
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    politicalParty: '',
    preferredLanguage: '',
    interests: [],
    occupation: '',
    employer: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handlePhotoUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const photoUrl = URL.createObjectURL(file);
      setProfile({ ...profile, [type]: photoUrl });
    }
  };

  const handlePhotoRemove = (type) => {
    setProfile({ ...profile, [type]: null });
  };

  const handleSocialMediaChange = (e, platform) => {
    setProfile({
      ...profile,
      socialMediaHandles: {
        ...profile.socialMediaHandles,
        [platform]: e.target.value,
      },
    });
  };

  const addInterest = () => {
    const interest = prompt('Enter a new interest:');
    if (interest) {
      setProfile({ ...profile, interests: [...profile.interests, interest] });
    }
  };

  const removeInterest = (index) => {
    setProfile({
      ...profile,
      interests: profile.interests.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Profile Updated:', profile);
    alert('Profile updated successfully!');
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Profile</h1>
      <form onSubmit={handleSubmit}>
        {/* Profile Photos */}
        <div className="mb-4 text-center">
          {profile.profilePhoto ? (
            <>
              <img
                src={profile.profilePhoto}
                alt="Profile"
                style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <div className="mt-2">
                <button
                  type="button"
                  className="btn btn-danger me-2"
                  onClick={() => handlePhotoRemove('profilePhoto')}
                >
                  Remove Profile Photo
                </button>
              </div>
            </>
          ) : (
            <>
              <label className="form-label">Upload Profile Photo</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={(e) => handlePhotoUpload(e, 'profilePhoto')}
              />
            </>
          )}
        </div>
        <div className="mb-4 text-center">
          {profile.thumbnailPhoto ? (
            <>
              <img
                src={profile.thumbnailPhoto}
                alt="Thumbnail"
                style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <div className="mt-2">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handlePhotoRemove('thumbnailPhoto')}
                >
                  Remove Thumbnail
                </button>
              </div>
            </>
          ) : (
            <>
              <label className="form-label">Upload Thumbnail Photo</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={(e) => handlePhotoUpload(e, 'thumbnailPhoto')}
              />
            </>
          )}
        </div>

        {/* Personal Information */}
        <h4>Personal Information</h4>
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className="form-control"
            value={profile.firstName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className="form-control"
            value={profile.lastName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="dateOfBirth" className="form-label">Date of Birth</label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            className="form-control"
            value={profile.dateOfBirth}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="gender" className="form-label">Gender</label>
          <input
            type="text"
            id="gender"
            name="gender"
            className="form-control"
            value={profile.gender}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="race" className="form-label">Race</label>
          <input
            type="text"
            id="race"
            name="race"
            className="form-control"
            value={profile.race}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="personalDescription" className="form-label">Personal Description</label>
          <textarea
            id="personalDescription"
            name="personalDescription"
            className="form-control"
            rows="3"
            value={profile.personalDescription}
            onChange={handleInputChange}
          />
        </div>

        {/* Contact Information */}
        <h4>Contact Information</h4>
        <div className="mb-3">
          <label htmlFor="homePhone" className="form-label">Home Phone</label>
          <input
            type="tel"
            id="homePhone"
            name="homePhone"
            className="form-control"
            value={profile.homePhone}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cellPhone" className="form-label">Cell Phone</label>
          <input
            type="tel"
            id="cellPhone"
            name="cellPhone"
            className="form-control"
            value={profile.cellPhone}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="preferredContactMethod" className="form-label">Preferred Contact Method</label>
          <select
            id="preferredContactMethod"
            name="preferredContactMethod"
            className="form-select"
            value={profile.preferredContactMethod}
            onChange={handleInputChange}
          >
            <option value="">-- Select --</option>
            <option value="email">Email</option>
            <option value="cell">Cell</option>
            <option value="home_phone">Home Phone</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="websiteUrl" className="form-label">Website URL</label>
          <input
            type="url"
            id="websiteUrl"
            name="websiteUrl"
            className="form-control"
            value={profile.websiteUrl}
            onChange={handleInputChange}
          />
        </div>

        {/* Social Media Handles */}
        <h4>Social Media</h4>
        <div className="mb-3">
          <label htmlFor="twitter" className="form-label">Twitter</label>
          <input
            type="text"
            id="twitter"
            name="twitter"
            className="form-control"
            value={profile.socialMediaHandles.twitter}
            onChange={(e) => handleSocialMediaChange(e, 'twitter')}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="linkedin" className="form-label">LinkedIn</label>
          <input
            type="text"
            id="linkedin"
            name="linkedin"
            className="form-control"
            value={profile.socialMediaHandles.linkedin}
            onChange={(e) => handleSocialMediaChange(e, 'linkedin')}
          />
        </div>

        {/* Mailing Address */}
        <h4>Mailing Address</h4>
        <div className="mb-3">
          <label htmlFor="address1" className="form-label">Address Line 1</label>
          <input
            type="text"
            id="address1"
            name="address1"
            className="form-control"
            value={profile.address1}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address2" className="form-label">Address Line 2 (Optional)</label>
          <input
            type="text"
            id="address2"
            name="address2"
            className="form-control"
            value={profile.address2}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="city" className="form-label">City</label>
          <input
            type="text"
            id="city"
            name="city"
            className="form-control"
            value={profile.city}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="state" className="form-label">State</label>
          <input
            type="text"
            id="state"
            name="state"
            className="form-control"
            value={profile.state}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="zip" className="form-label">ZIP Code</label>
          <input
            type="text"
            id="zip"
            name="zip"
            className="form-control"
            value={profile.zip}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Preferences */}
        <h4>Preferences</h4>
        <div className="mb-3">
          <label htmlFor="politicalParty" className="form-label">Political Party</label>
          <input
            type="text"
            id="politicalParty"
            name="politicalParty"
            className="form-control"
            value={profile.politicalParty}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="preferredLanguage" className="form-label">Preferred Language</label>
          <select
            id="preferredLanguage"
            name="preferredLanguage"
            className="form-select"
            value={profile.preferredLanguage}
            onChange={handleInputChange}
          >
            <option value="">-- Select --</option>
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Interests</label>
          <div className="d-flex flex-wrap mb-2">
            {profile.interests.map((interest, index) => (
              <span
                key={index}
                className="badge bg-secondary me-2 mb-2"
                style={{ cursor: 'pointer' }}
                onClick={() => removeInterest(index)}
              >
                {interest} ×
              </span>
            ))}
          </div>
          <button type="button" className="btn btn-outline-primary" onClick={addInterest}>
            Add Interest
          </button>
        </div>

        <div className="mb-3">
          <label htmlFor="occupation" className="form-label">Occupation</label>
          <input
            type="text"
            id="occupation"
            name="occupation"
            className="form-control"
            value={profile.occupation}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="employer" className="form-label">Employer</label>
          <input
            type="text"
            id="employer"
            name="employer"
            className="form-control"
            value={profile.employer}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">Save Changes</button>
      </form>
    </div>
  );
};

export default Profile;

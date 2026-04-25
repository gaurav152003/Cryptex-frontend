import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import { VerifiedIcon, Pencil } from "lucide-react";
import AccountVarificationForm from "./AccountVarificationForm";
import { enableTwoStepAuthentication, verifyOtp } from "@/Redux/Auth/Action";
import { ReloadIcon } from "@radix-ui/react-icons";

/* ---------------- DEFAULT PROFILE ---------------- */
const defaultProfile = {
  dob: "",
  nationality: "",
  address: "",
  city: "",
  postcode: "",
  country: "",
};

/* ---------------- INPUT STYLE ---------------- */
const inputClass = (isEditing) =>
  `w-full bg-transparent px-3 py-2 text-sm text-gray-300 rounded-md
   ${
     !isEditing
       ? "bg-transparent border-none px-0 text-gray-300"
       : "bg-muted border border-gray-700 px-3"
   }`;

const Profile = () => {
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();

  const [profile, setProfile] = useState(defaultProfile);
  const [isEditing, setIsEditing] = useState(false);

  /* -------- LOAD FROM LOCAL STORAGE -------- */
  useEffect(() => {
    const savedProfile = localStorage.getItem("profile_info");
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  /* -------- HANDLE CHANGE -------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  /* -------- SAVE PROFILE -------- */
  const handleSaveProfile = () => {
    localStorage.setItem("profile_info", JSON.stringify(profile));
    setIsEditing(false);
  };

  /* -------- 2FA -------- */
  // const handleEnableTwoStepVerification = (otp) => {
  //   dispatch(
  //     enableTwoStepAuthentication({
  //       jwt: localStorage.getItem("jwt"),
  //       otp,
  //     }),
  //   );
  // };

  // const handleVerifyOtp = (otp) => {
  //   dispatch(
  //     verifyOtp({
  //       jwt: localStorage.getItem("jwt"),
  //       otp,
  //     }),
  //   );
  // };

  return (
    <div className="flex justify-center mb-10 mt-20">
      <div className="pt-10 w-full max-w-7xl space-y-8 px-4">
        {/* ================= YOUR INFORMATION ================= */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Your Information</CardTitle>

            {!isEditing && (
              <div className="flex flex-row gap-5 items-center cursor-pointer">
                <ReloadIcon
                  onClick={() => {
                    window.location.reload();
                  }}
                  className="h-5 w-5"
                />
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsEditing(true)}
                  className="flex gap-2"
                >
                  <Pencil size={14} /> Edit
                </Button>
              </div>
            )}
          </CardHeader>

          <CardContent className="space-y-10 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* LEFT */}
              <div className="space-y-6">
                <div className="grid grid-cols-[140px_1fr] items-center gap-4">
                  <p className="text-gray-400 text-sm">Email :</p>
                  <p className="text-gray-300 ml-3">{auth.user?.email}</p>
                </div>

                <div className="grid grid-cols-[140px_1fr] items-center gap-4">
                  <p className="text-gray-400 text-sm">Full Name :</p>
                  <p className="text-gray-300 ml-3">{auth.user?.fullName}</p>
                </div>

                <div className="grid grid-cols-[140px_1fr] items-center gap-4">
                  <p className="text-gray-400 text-sm">Date Of Birth :</p>
                  <input
                    type="date"
                    name="dob"
                    value={profile.dob}
                    onChange={handleChange}
                    readOnly={!isEditing}
                    className={inputClass(isEditing)}
                  />
                </div>

                <div className="grid grid-cols-[140px_1fr] items-center gap-4">
                  <p className="text-gray-400 text-sm">Nationality :</p>
                  <input
                    name="nationality"
                    value={profile.nationality}
                    onChange={handleChange}
                    readOnly={!isEditing}
                    className={inputClass(isEditing)}
                  />
                </div>
              </div>

              {/* RIGHT */}
              <div className="space-y-6">
                <div className="grid grid-cols-[140px_1fr] items-center gap-4">
                  <p className="text-gray-400 text-sm">Address :</p>
                  <input
                    name="address"
                    value={profile.address}
                    onChange={handleChange}
                    readOnly={!isEditing}
                    className={inputClass(isEditing)}
                  />
                </div>

                <div className="grid grid-cols-[140px_1fr] items-center gap-4">
                  <p className="text-gray-400 text-sm">City :</p>
                  <input
                    name="city"
                    value={profile.city}
                    onChange={handleChange}
                    readOnly={!isEditing}
                    className={inputClass(isEditing)}
                  />
                </div>

                <div className="grid grid-cols-[140px_1fr] items-center gap-4">
                  <p className="text-gray-400 text-sm">Postcode :</p>
                  <input
                    name="postcode"
                    value={profile.postcode}
                    onChange={handleChange}
                    readOnly={!isEditing}
                    className={inputClass(isEditing)}
                  />
                </div>

                <div className="grid grid-cols-[140px_1fr] items-center gap-4">
                  <p className="text-gray-400 text-sm">Country :</p>
                  <input
                    name="country"
                    value={profile.country}
                    onChange={handleChange}
                    readOnly={!isEditing}
                    className={inputClass(isEditing)}
                  />
                </div>
              </div>
            </div>

            {isEditing && (
              <div className="flex gap-4">
                <Button
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={handleSaveProfile}
                >
                  Save Profile
                </Button>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* ================= 2FA + ACCOUNT STATUS ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 2 STEP */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <CardTitle>2 Step Authentication</CardTitle>
                {auth.user?.twoFactorAuth?.enabled ? (
                  <Badge className="bg-green-600 text-white flex gap-1">
                    <VerifiedIcon size={14} /> Enabled
                  </Badge>
                ) : (
                  <Badge className="bg-orange-500">Disabled</Badge>
                )}
              </div>
            </CardHeader>

            <CardContent className="space-y-5">
              <p className="text-gray-400">{auth.user?.email}</p>

              <Dialog>
                <DialogTrigger
                  asChild
                  disabled={auth.user?.twoFactorAuth?.enabled}
                >
                  <Button
                    className="w-full"
                    disabled={auth.user?.twoFactorAuth?.enabled}
                    variant={
                      auth.user?.twoFactorAuth?.enabled
                        ? "secondary"
                        : "default"
                    }
                  >
                    {auth.user?.twoFactorAuth?.enabled
                      ? "Two Step Authentication Enabled"
                      : "Enable Two Step Authentication"}
                  </Button>
                </DialogTrigger>

                <DialogContent className="border border-white/20">
                  <DialogHeader>
                    <DialogTitle className="text-center">
                      Enable Two Step Authentication
                    </DialogTitle>
                  </DialogHeader>

                  <AccountVarificationForm
                    mode="TWO_STEP_AUTH"
                    handleSubmit={(otp) =>
                      dispatch(
                        enableTwoStepAuthentication({
                          jwt: localStorage.getItem("jwt"),
                          otp,
                        }),
                      )
                    }
                  />
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          {/* ACCOUNT STATUS */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <CardTitle>Account Status</CardTitle>
                {auth.user?.verified ? (
                  <Badge className="bg-green-600 text-white flex gap-1">
                    <VerifiedIcon size={14} /> Verified
                  </Badge>
                ) : (
                  <Badge className="bg-orange-500">Pending</Badge>
                )}
              </div>
            </CardHeader>

            <CardContent className="space-y-5">
              <p>{auth.user?.email}</p>

              <Dialog>
                <DialogTrigger asChild disabled={auth.user?.verified}>
                  <Button
                    className="w-full"
                    disabled={auth.user?.verified}
                    variant={auth.user?.verified ? "secondary" : "default"}
                  >
                    {auth.user?.verified
                      ? "Account Verified"
                      : "Verify Account"}
                  </Button>
                </DialogTrigger>

                <DialogContent className="border border-white/20">
                  <DialogHeader>
                    <DialogTitle
                      disabled={auth.user?.twoFactorAuth?.enabled}
                      className="text-center"
                    >
                      Verify your account
                    </DialogTitle>
                  </DialogHeader>

                  <AccountVarificationForm
                    mode="VERIFY_ACCOUNT"
                    handleSubmit={(otp) =>
                      dispatch(
                        verifyOtp({
                          jwt: localStorage.getItem("jwt"),
                          otp,
                        }),
                      )
                    }
                  />
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;

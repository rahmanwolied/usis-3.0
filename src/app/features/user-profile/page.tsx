'use client'

import { useState } from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function UserProfileSettings() {
    const { theme, setTheme } = useTheme()
    const [profileImage, setProfileImage] = useState('/placeholder.svg?height=100&width=100')

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setProfileImage(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <div className="min-h-screen bg-background text-foreground">
            <div className="container mx-auto p-4">
                <Card className="w-full max-w-4xl mx-auto">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>User Profile Settings</CardTitle>
                        <div className="flex items-center space-x-2">
                            <Switch
                                id="dark-mode"
                                checked={theme === 'dark'}
                                onCheckedChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            />
                            <Label htmlFor="dark-mode">
                                {theme === 'dark' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                            </Label>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center space-x-4">
                            <img
                                src={profileImage}
                                alt="Profile"
                                className="w-24 h-24 rounded-full object-cover"
                            />
                            <div>
                                <Label htmlFor="profile-image" className="cursor-pointer">
                                    <div className="flex items-center space-x-2">
                                        <Upload className="h-4 w-4" />
                                        <span>Change Photo</span>
                                    </div>
                                </Label>
                                <Input
                                    id="profile-image"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageUpload}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="full-name">Full Name</Label>
                                <Input id="full-name" defaultValue="NABANITA SARKER" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="student-id">Student ID</Label>
                                <Input id="student-id" defaultValue="21301037" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" defaultValue="nabanitasarker18@gmail.com" disabled />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="mobile">Mobile Number</Label>
                                <Input id="mobile" defaultValue="01781841019" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="home-phone">Home Phone</Label>
                                <Input id="home-phone" defaultValue="01712555374" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="nationality">Nationality</Label>
                                <Input id="nationality" defaultValue="Bangladeshi" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="blood-group">Blood Group</Label>
                                <Select defaultValue="AB+">
                                    <SelectTrigger id="blood-group">
                                        <SelectValue placeholder="Select blood group" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="A+">A+</SelectItem>
                                        <SelectItem value="A-">A-</SelectItem>
                                        <SelectItem value="B+">B+</SelectItem>
                                        <SelectItem value="B-">B-</SelectItem>
                                        <SelectItem value="AB+">AB+</SelectItem>
                                        <SelectItem value="AB-">AB-</SelectItem>
                                        <SelectItem value="O+">O+</SelectItem>
                                        <SelectItem value="O-">O-</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="program">Program</Label>
                                <Input
                                    id="program"
                                    defaultValue="BACHELOR OF SCIENCE IN COMPUTER SCIENCE AND ENGINEERING"
                                    disabled
                                    className="bg-muted"
                                />
                            </div>
                        </div>
                        <Button className="w-full">Save Changes</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
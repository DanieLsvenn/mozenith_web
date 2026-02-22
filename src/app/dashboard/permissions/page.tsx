"use client";

import { useState } from "react";
import { TopBar } from "@/components/dashboard";
import { useAuth } from "@/contexts/auth-context";
import { usePermissions, useUpdatePermission } from "@/hooks/use-permissions";
import { ROLES } from "@/lib/constants";
import { Permission } from "@/types/api";
import {
  Card,
  CardContent,
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Badge,
  Button,
  LoadingState,
  EmptyState,
  Alert,
  Modal,
  Input,
  Label,
} from "@/components/ui";
import { Key, Pencil } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function PermissionsPage() {
  const { hasRole } = useAuth();
  const isAdmin = hasRole(ROLES.ADMIN);

  const { data: permissions, isLoading, error } = usePermissions();
  const updatePermission = useUpdatePermission();

  // Modal states
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedPermission, setSelectedPermission] =
    useState<Permission | null>(null);
  const [editPermissionName, setEditPermissionName] = useState("");

  if (!isAdmin) {
    return (
      <>
        <TopBar title="Permissions" description="Manage system permissions" />
        <div className="p-6">
          <Alert variant="warning" title="Access Denied">
            You don't have permission to view this page. This feature is only
            available to administrators.
          </Alert>
        </div>
      </>
    );
  }

  const handleUpdatePermission = async () => {
    if (!selectedPermission || !editPermissionName.trim()) return;
    try {
      await updatePermission.mutateAsync({
        id: selectedPermission.id,
        data: { name: editPermissionName.trim() },
      });
      setIsEditOpen(false);
      setSelectedPermission(null);
      setEditPermissionName("");
    } catch (error) {
      console.error("Failed to update permission:", error);
    }
  };

  const openEditModal = (permission: Permission) => {
    setSelectedPermission(permission);
    setEditPermissionName(permission.name);
    setIsEditOpen(true);
  };

  return (
    <>
      <TopBar
        title="Permission Management"
        description="View and manage system permissions"
      />
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-[#3D3D3D]">
            All Permissions
          </h2>
          <p className="text-sm text-[#666666]">
            {permissions?.length || 0} permission(s) configured
          </p>
        </div>

        <Card>
          <CardContent className="p-0">
            {isLoading ? (
              <LoadingState message="Loading permissions..." />
            ) : error ? (
              <div className="p-6">
                <Alert variant="error" title="Error loading permissions">
                  {(error as Error).message ||
                    "Failed to load permissions. Please try again."}
                </Alert>
              </div>
            ) : !permissions?.length ? (
              <EmptyState
                icon={<Key className="h-8 w-8 text-[#666666]" />}
                title="No permissions found"
                description="No permissions have been configured yet."
              />
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Permission Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {permissions.map((permission) => (
                    <TableRow key={permission.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#99E7F1]/30">
                            <Key className="h-5 w-5 text-[#0054C5]" />
                          </div>
                          <div>
                            <Badge variant="outline" className="font-mono">
                              {permission.name}
                            </Badge>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-[#666666]">
                          {permission.description || "—"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-[#666666]">
                          {permission.createdAt
                            ? formatDate(permission.createdAt)
                            : "—"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openEditModal(permission)}
                            title="Edit Permission"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Edit Permission Modal */}
      <Modal
        isOpen={isEditOpen}
        onClose={() => {
          setIsEditOpen(false);
          setSelectedPermission(null);
          setEditPermissionName("");
        }}
        title="Edit Permission"
        description="Update the permission name."
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="editPermissionName">Permission Name</Label>
            <Input
              id="editPermissionName"
              placeholder="Permission name"
              value={editPermissionName}
              onChange={(e) => setEditPermissionName(e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => {
                setIsEditOpen(false);
                setSelectedPermission(null);
                setEditPermissionName("");
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdatePermission}
              isLoading={updatePermission.isPending}
              disabled={!editPermissionName.trim()}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

"use client";

import { useState } from "react";
import { TopBar } from "@/components/dashboard";
import { useAuth } from "@/contexts/auth-context";
import {
  useRoles,
  useCreateRole,
  useUpdateRole,
  useDeleteRole,
  useUpdateRolePermissions,
} from "@/hooks/use-roles";
import { usePermissions } from "@/hooks/use-permissions";
import { ROLES } from "@/lib/constants";
import { Role, Permission } from "@/types/api";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
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
  ConfirmModal,
  Input,
  Label,
} from "@/components/ui";
import { Shield, Plus, Pencil, Trash2, Key, Check, X } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function RolesPage() {
  const { hasRole } = useAuth();
  const isAdmin = hasRole(ROLES.ADMIN);

  const { data: roles, isLoading, error } = useRoles();
  const { data: permissions } = usePermissions();
  const createRole = useCreateRole();
  const updateRole = useUpdateRole();
  const deleteRole = useDeleteRole();
  const updateRolePermissions = useUpdateRolePermissions();

  // Modal states
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isPermissionsOpen, setIsPermissionsOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  // Form states
  const [newRoleName, setNewRoleName] = useState("");
  const [editRoleName, setEditRoleName] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState<number[]>([]);

  if (!isAdmin) {
    return (
      <>
        <TopBar title="Roles" description="Manage user roles and permissions" />
        <div className="p-6">
          <Alert variant="warning" title="Access Denied">
            You don't have permission to view this page. This feature is only
            available to administrators.
          </Alert>
        </div>
      </>
    );
  }

  const handleCreateRole = async () => {
    if (!newRoleName.trim()) return;
    try {
      await createRole.mutateAsync({ name: newRoleName.trim() });
      setIsCreateOpen(false);
      setNewRoleName("");
    } catch (error) {
      console.error("Failed to create role:", error);
    }
  };

  const handleUpdateRole = async () => {
    if (!selectedRole || !editRoleName.trim()) return;
    try {
      await updateRole.mutateAsync({
        id: selectedRole.id,
        data: { name: editRoleName.trim() },
      });
      setIsEditOpen(false);
      setSelectedRole(null);
      setEditRoleName("");
    } catch (error) {
      console.error("Failed to update role:", error);
    }
  };

  const handleDeleteRole = async () => {
    if (!selectedRole) return;
    try {
      await deleteRole.mutateAsync(selectedRole.id);
      setIsDeleteOpen(false);
      setSelectedRole(null);
    } catch (error) {
      console.error("Failed to delete role:", error);
    }
  };

  const handleUpdatePermissions = async () => {
    if (!selectedRole) return;
    try {
      await updateRolePermissions.mutateAsync({
        id: selectedRole.id,
        data: { permissionIds: selectedPermissions },
      });
      setIsPermissionsOpen(false);
      setSelectedRole(null);
      setSelectedPermissions([]);
    } catch (error) {
      console.error("Failed to update permissions:", error);
    }
  };

  const openEditModal = (role: Role) => {
    setSelectedRole(role);
    setEditRoleName(role.name);
    setIsEditOpen(true);
  };

  const openDeleteModal = (role: Role) => {
    setSelectedRole(role);
    setIsDeleteOpen(true);
  };

  const openPermissionsModal = (role: Role) => {
    setSelectedRole(role);
    setSelectedPermissions(role.permissions?.map((p) => p.id) || []);
    setIsPermissionsOpen(true);
  };

  const togglePermission = (permId: number) => {
    setSelectedPermissions((prev) =>
      prev.includes(permId)
        ? prev.filter((id) => id !== permId)
        : [...prev, permId],
    );
  };

  return (
    <>
      <TopBar
        title="Role Management"
        description="Create and manage user roles with permissions"
      />
      <div className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-[#3D3D3D]">All Roles</h2>
            <p className="text-sm text-[#666666]">
              {roles?.length || 0} role(s) configured
            </p>
          </div>
          <Button onClick={() => setIsCreateOpen(true)}>
            <Plus className="h-4 w-4" />
            Create Role
          </Button>
        </div>

        <Card>
          <CardContent className="p-0">
            {isLoading ? (
              <LoadingState message="Loading roles..." />
            ) : error ? (
              <div className="p-6">
                <Alert variant="error" title="Error loading roles">
                  {(error as Error).message ||
                    "Failed to load roles. Please try again."}
                </Alert>
              </div>
            ) : !roles?.length ? (
              <EmptyState
                icon={<Shield className="h-8 w-8 text-[#666666]" />}
                title="No roles found"
                description="Create your first role to get started."
                action={
                  <Button onClick={() => setIsCreateOpen(true)}>
                    <Plus className="h-4 w-4" />
                    Create Role
                  </Button>
                }
              />
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Role Name</TableHead>
                    <TableHead>Permissions</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {roles.map((role) => (
                    <TableRow key={role.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#99E7F1]/30">
                            <Shield className="h-5 w-5 text-[#0054C5]" />
                          </div>
                          <div>
                            <p className="font-medium text-[#3D3D3D]">
                              {role.name}
                            </p>
                            {role.description && (
                              <p className="text-sm text-[#666666]">
                                {role.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {role.permissions?.length ? (
                            role.permissions.slice(0, 3).map((perm) => (
                              <Badge key={perm.id} variant="outline">
                                {perm.name}
                              </Badge>
                            ))
                          ) : (
                            <span className="text-sm text-[#666666]">
                              No permissions
                            </span>
                          )}
                          {role.permissions?.length > 3 && (
                            <Badge variant="secondary">
                              +{role.permissions.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-[#666666]">
                          {role.createdAt ? formatDate(role.createdAt) : "—"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openPermissionsModal(role)}
                            title="Manage Permissions"
                          >
                            <Key className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openEditModal(role)}
                            title="Edit Role"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openDeleteModal(role)}
                            title="Delete Role"
                            className="text-red-500 hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
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

      {/* Create Role Modal */}
      <Modal
        isOpen={isCreateOpen}
        onClose={() => {
          setIsCreateOpen(false);
          setNewRoleName("");
        }}
        title="Create New Role"
        description="Enter a name for the new role."
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="roleName">Role Name</Label>
            <Input
              id="roleName"
              placeholder="e.g., MODERATOR"
              value={newRoleName}
              onChange={(e) => setNewRoleName(e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => {
                setIsCreateOpen(false);
                setNewRoleName("");
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateRole}
              isLoading={createRole.isPending}
              disabled={!newRoleName.trim()}
            >
              Create Role
            </Button>
          </div>
        </div>
      </Modal>

      {/* Edit Role Modal */}
      <Modal
        isOpen={isEditOpen}
        onClose={() => {
          setIsEditOpen(false);
          setSelectedRole(null);
          setEditRoleName("");
        }}
        title="Edit Role"
        description="Update the role name."
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="editRoleName">Role Name</Label>
            <Input
              id="editRoleName"
              placeholder="Role name"
              value={editRoleName}
              onChange={(e) => setEditRoleName(e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => {
                setIsEditOpen(false);
                setSelectedRole(null);
                setEditRoleName("");
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdateRole}
              isLoading={updateRole.isPending}
              disabled={!editRoleName.trim()}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete Role Modal */}
      <ConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
          setSelectedRole(null);
        }}
        onConfirm={handleDeleteRole}
        title="Delete Role"
        description={`Are you sure you want to delete the role "${selectedRole?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        variant="destructive"
        isLoading={deleteRole.isPending}
      />

      {/* Permissions Modal */}
      <Modal
        isOpen={isPermissionsOpen}
        onClose={() => {
          setIsPermissionsOpen(false);
          setSelectedRole(null);
          setSelectedPermissions([]);
        }}
        title={`Manage Permissions: ${selectedRole?.name}`}
        description="Select the permissions for this role."
        className="max-w-2xl"
      >
        <div className="space-y-4">
          <div className="max-h-96 space-y-2 overflow-y-auto rounded-lg border border-[#EEEEEE] p-4">
            {permissions?.length ? (
              permissions.map((perm) => (
                <label
                  key={perm.id}
                  className="flex cursor-pointer items-center justify-between rounded-lg p-3 transition-colors hover:bg-[#EEEEEE]"
                >
                  <div className="flex items-center gap-3">
                    <Key className="h-4 w-4 text-[#0054C5]" />
                    <div>
                      <p className="font-medium text-[#3D3D3D]">{perm.name}</p>
                      {perm.description && (
                        <p className="text-sm text-[#666666]">
                          {perm.description}
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => togglePermission(perm.id)}
                    className={`flex h-6 w-6 items-center justify-center rounded-md border transition-colors ${
                      selectedPermissions.includes(perm.id)
                        ? "border-[#0054C5] bg-[#0054C5] text-white"
                        : "border-[#EEEEEE]"
                    }`}
                  >
                    {selectedPermissions.includes(perm.id) && (
                      <Check className="h-4 w-4" />
                    )}
                  </button>
                </label>
              ))
            ) : (
              <p className="py-4 text-center text-[#666666]">
                No permissions available
              </p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-[#666666]">
              {selectedPermissions.length} permission(s) selected
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setIsPermissionsOpen(false);
                  setSelectedRole(null);
                  setSelectedPermissions([]);
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleUpdatePermissions}
                isLoading={updateRolePermissions.isPending}
              >
                Save Permissions
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
